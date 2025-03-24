import React from 'react';
import './CodeDisplay.css';

const CodeDisplay = () => {
  const code = `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

type Todo struct {
    ObjectID    string \`json:"objectId,omitempty"\`
    Title       string \`json:"title,omitempty"\`
    IsCompleted bool   \`json:"isCompleted,omitempty"\`
}

func main() {
    // Example: Create Todo
    newTodo := Todo{
        Title:       "Buy groceries",
        IsCompleted: false,
    }
    created, err := createTodo(newTodo)
    if err != nil {
        log.Println("Error creating todo:", err)
    } else {
        log.Println("Created todo with ID:", created.ObjectID)
    }

    // Example: Fetch Todos
    todos, err := fetchAllTodos()
    if err != nil {
        log.Println("Error fetching todos:", err)
    } else {
        for _, t := range todos {
            log.Println("Fetched todo:", t.Title, t.IsCompleted)
        }
    }
}`;

  return (
    <div className="code-display-container">
      <img 
        src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/drXO0UqsgxhFvRDiVmsMb_image.png?format=webp&width=1248" 
        alt="Пример изображения" 
        className="display-image"
      />
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
