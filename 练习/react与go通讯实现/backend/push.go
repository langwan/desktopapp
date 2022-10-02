package main

import (
	"backend/pb"
	"context"
)

type PushService struct {
}

type PushMessage struct {
	Method string
	Body   interface{}
}

func (f PushService) UpdateCount(ctx context.Context, request *pb.UpdateCountRequest) (*pb.Empty, error) {

	pushMessage := PushMessage{
		Method: "UpdateCount",
		Body:   request,
	}
	socketio.BroadcastToAll("push", &pushMessage)
	return &pb.Empty{}, nil
}
