package configuration

import (
	"encoding/json"
	"fmt"
	"os"
	"path"
	"path/filepath"
)

type Configuration struct {
	Port string `json:"port"`
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
