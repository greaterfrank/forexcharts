package configuration

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
	"path/filepath"
)

type DBConfig struct {
	Addr   string `json:"addr"`
	User   string `json:"user"`
	Passwd string `json:"passwd"`
	DBName string `json:"dbname"`
}

type Configuration struct {
	Port     string   `json:"port"`
	DbConfig DBConfig `json:"dbConfig"`
}

func LoadIniFiles(iniFilename string) (*Configuration, error) {

	dir, err := filepath.Abs(filepath.Dir("."))
	if err != nil {
		return nil, err
	}
	pathname := path.Join(dir, iniFilename)

	fmt.Println("LoadIniFiles: pathname=", pathname)

	iniFile, err := os.Open(pathname)
	if err != nil {
		return nil, err
	}
	defer iniFile.Close()

	config := &Configuration{}
	if err := json.NewDecoder(iniFile).Decode(config); err != nil {
		return nil, err
	}

	val, _ := json.Marshal(config)
	fmt.Println("LoadIniFiles: config=", string(val))

	return config, nil
}
