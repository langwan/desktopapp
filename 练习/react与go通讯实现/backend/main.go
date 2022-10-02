package main

import (
	"backend/pb"
	"context"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

var backendService = BackendService{}
var pushService = PushService{}

func main() {
	g := gin.Default()
	g.Use(cors.New(cors.Config{
		AllowAllOrigins:        true,
		AllowMethods:           []string{"POST"},
		AllowHeaders:           []string{"*	"},
		AllowCredentials:       false,
		ExposeHeaders:          nil,
		MaxAge:                 12 * time.Hour,
		AllowWildcard:          false,
		AllowBrowserExtensions: false,
		AllowWebSockets:        false,
		AllowFiles:             false,
	}))
	NewSocketIO(g)

	go func() {
		var count int64 = 0
		for {
			count++
			pushService.UpdateCount(context.Background(), &pb.UpdateCountRequest{Count: count})
			time.Sleep(time.Second)
		}
	}()

	g.Run(":8000")
	pb.RegisterBackendServer(nil, &backendService)
	pb.RegisterPushServer(nil, &pushService)
}
