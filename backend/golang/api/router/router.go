package router

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

/*
{
	_id: string;
	prod_name: string;
	prod_desc: string;
	prod_price: number;
	updated_at: Date;
  }
*/

type Response struct {
	Error   int         `json:"Error"`
	Message string      `json:"Message"`
	Data    interface{} `json:"Data"`
}

func handleGetItem() gin.HandlerFunc {
	return func(c *gin.Context) {

		var jsonMap []map[string]interface{}
		json.Unmarshal([]byte(`[{"_id":1,"prod_name":"name1","prod_desc":"desc1","prod_price":1.01,"update_at":"2012-04-21T18:25:43.511Z"},{"_id":2,"prod_name":"name2","prod_desc":"desc2","prod_price":2.01,"update_at":"2012-05-23T18:25:43.511Z"}]`), &jsonMap)
		fmt.Println("handleGetItem")
		fmt.Println(jsonMap)
		//id := c.DefaultQuery("id", "")
		var response Response
		response.Error = 0
		response.Data = jsonMap
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

func InitRouter() *gin.Engine {
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
