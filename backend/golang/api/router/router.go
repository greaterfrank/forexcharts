package router

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.frank/notes/note_golang_restful_api/api/handler"
)

func handleGetRoot() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("handleGetRoot")
		var response handler.Response
		response.Error = 0
		response.Data = "root"
		response.Message = "ok"
		c.JSON(http.StatusOK, response)
	}
}

func InitRouter(db *sql.DB) *gin.Engine {
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
	data.GET("/getItem", handler.HandleGetItem(db))
	data.GET("/", handleGetRoot())

	return engine
}
