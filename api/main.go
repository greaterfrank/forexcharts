package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Settings struct {
	Port string `json:"port"`
}

type Response struct {
	Error   int    `json:"Error"`
	Message string `json:"Message"`
	Data    string `json:"Data"`
}

func handleGetItem() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("handleGetItem")
		id := c.DefaultQuery("id", "")
		var response Response
		response.Error = 0
		response.Data = id
		response.Message = "ok"
		c.JSON(http.StatusOK, response)
	}
}

func handleGetRoot() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("handleGetRoot")
		var response Response
		response.Error = 0
		response.Data = "root"
		response.Message = "ok"
		c.JSON(http.StatusOK, response)
	}
}

func initRouter() *gin.Engine {
	engine := gin.New()
	engine.UseRawPath = true
	engine.ForwardedByClientIP = true

	engine.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST"},
		AllowHeaders:    []string{"*"},
	}))

	data := engine.Group("/api/data")
	//data.POST("/updateItem", handlePOST())
	data.GET("/getItem", handleGetItem())
	data.GET("/", handleGetRoot())

	return engine
}

func main() {
	fmt.Println("Hello Golang !")
	conf := Settings{Port: "8080"}

	engine := initRouter()

	server := &http.Server{
		Addr:    ":" + conf.Port,
		Handler: engine,
	}

	server.ListenAndServe()
}
