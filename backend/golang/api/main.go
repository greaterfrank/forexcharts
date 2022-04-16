package main

import (
	"fmt"
	"net/http"

	"golang.frank/notes/note_golang_restful_api/api/configuration"
	"golang.frank/notes/note_golang_restful_api/api/router"
)

func main() {
	fmt.Println("Hello Golang !")

	conf, err := configuration.LoadIniFiles("config.json")
	if err != nil {
		fmt.Println("failed to load settings: " + err.Error())
		panic(err)
	}

	fmt.Println("port=", conf.Port)

	engine := router.InitRouter()

	server := &http.Server{
		Addr:    ":" + conf.Port,
		Handler: engine,
	}

	server.ListenAndServe()
}
