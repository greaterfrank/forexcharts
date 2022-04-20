package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/go-sql-driver/mysql"
	"golang.frank/notes/note_golang_restful_api/api/configuration"
	"golang.frank/notes/note_golang_restful_api/api/router"
)

func dbConn(conf *configuration.Configuration) (*sql.DB, error) {
	// Initialize Viper db
	fmt.Println("", conf.DbConfig.Addr, conf.DbConfig.DBName, conf.DbConfig.User)

	config := mysql.Config{
		User:                 conf.DbConfig.User,
		Passwd:               conf.DbConfig.Passwd,
		Net:                  "tcp",
		Addr:                 conf.DbConfig.Addr,
		DBName:               conf.DbConfig.DBName,
		AllowNativePasswords: true,
		MaxAllowedPacket:     0,
		Timeout:              10 * time.Second,
	}

	db, err := sql.Open("mysql", config.FormatDSN())
	if err != nil {
		return nil, err
	}

	maxConnections := 10
	db.SetMaxOpenConns(maxConnections)

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func main() {
	fmt.Println("Hello Golang !")

	conf, err := configuration.LoadIniFiles("config.json")
	if err != nil {
		fmt.Println("failed to load settings: " + err.Error())
		panic(err)
	}

	fmt.Println("port=", conf.Port)

	db, err := dbConn(conf)
	if err != nil {
		fmt.Println("failed connect to db:: " + err.Error())
		return
	}
	fmt.Println("db connected")
	defer db.Close()

	engine := router.InitRouter(db)

	server := &http.Server{
		Addr:    ":" + conf.Port,
		Handler: engine,
	}

	server.ListenAndServe()
}
