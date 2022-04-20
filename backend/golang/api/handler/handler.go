package handler

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Error   int         `json:"Error"`
	Message string      `json:"Message"`
	Data    interface{} `json:"Data"`
}

type Rate struct {
	Open  *float32
	High  *float32
	Low   *float32
	Close *float32
	Time  *string
}

func HandleGetItem(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var (
			args     []interface{}
			rows     *sql.Rows
			duration time.Duration
			err      error
			results  []Rate
		)
		query := "select time,open,high,low,close from fxusdcad limit 1000"
		preQueryTime := time.Now()
		rows, err = db.Query(query, args...)
		duration = time.Since(preQueryTime)

		fmt.Println("HandleGetItem:", duration, err)

		defer rows.Close()

		for rows.Next() {
			var rate Rate
			err := rows.Scan(
				&rate.Time,
				&rate.Open,
				&rate.High,
				&rate.Low,
				&rate.Close,
			)
			if err != nil {
				fmt.Println("db scan error")
				var response Response
				response.Error = 1
				response.Data = nil
				response.Message = "db error"
				c.JSON(http.StatusOK, response)
				return
			}
			results = append(results, rate)
		}

		//var jsonMap []map[string]interface{}
		//json.Unmarshal([]byte(`[{"_id":1,"prod_name":"name1","prod_desc":"desc1","prod_price":1.01,"update_at":"2012-04-21T18:25:43.511Z"},{"_id":2,"prod_name":"name2","prod_desc":"desc2","prod_price":2.01,"update_at":"2012-05-23T18:25:43.511Z"}]`), &jsonMap)
		//fmt.Println("handleGetItem")
		//fmt.Println(jsonMap)
		//id := c.DefaultQuery("id", "")
		var response Response
		response.Error = 0
		//response.Data = jsonMap
		response.Data = results
		response.Message = "ok"
		c.JSON(http.StatusOK, response)
	}
}
