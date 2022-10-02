package main

import (
	"backend/pb"
	"context"
	"encoding/json"
	"fmt"
	gosocketio "github.com/ambelovsky/gosf-socketio"
	"github.com/ambelovsky/gosf-socketio/transport"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"reflect"
)

var socketio *gosocketio.Server

func NewSocketIO(g *gin.Engine) {
	socketio = gosocketio.NewServer(transport.GetDefaultWebsocketTransport())
	g.Any("/socket.io/*any", gin.WrapH(socketio))
	socketio.On(gosocketio.OnConnection, func(c *gosocketio.Channel) {
		fmt.Printf("ss connection")
		c.Emit("hello", "im ss")
	})

	socketio.On("request", func(c *gosocketio.Channel, message *pb.StreamMessage) *pb.StreamMessage {

		tp := reflect.TypeOf(backendService)
		method, ok := tp.MethodByName(message.GetMethod())
		if !ok {
			return &pb.StreamMessage{
				ClientId: "",
				Method:   "",
				Body:     "",
				Code:     int32(codes.NotFound),
				Message:  "method not find",
			}
		}

		method.Type.NumIn()

		parameter := method.Type.In(2)
		req := reflect.New(parameter.Elem()).Interface()
		json.Unmarshal([]byte(message.GetBody()), req)

		in := make([]reflect.Value, 0)
		ctx := context.Background()
		in = append(in, reflect.ValueOf(ctx))
		in = append(in, reflect.ValueOf(req))
		call := reflect.ValueOf(&backendService).MethodByName(message.GetMethod()).Call(in)
		if call[1].Interface() != nil {
			e := call[1].Interface().(error)
			st, _ := status.FromError(e)

			return &pb.StreamMessage{
				ClientId: "",
				Method:   "",
				Body:     "",
				Code:     int32(st.Code()),
				Message:  st.Message(),
			}
		}

		marshal, err := json.Marshal(call[0].Interface())
		if err != nil {
			return &pb.StreamMessage{
				ClientId: "",
				Method:   "",
				Body:     "",
				Code:     int32(codes.Aborted),
				Message:  "marshal error",
			}
		}
		return &pb.StreamMessage{
			ClientId: "",
			Method:   "",
			Body:     string(marshal),
			Code:     0,
			Message:  "",
		}
	})
}
