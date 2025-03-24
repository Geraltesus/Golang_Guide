import React from 'react';

function Guide() {
  return (
    <div className="guide">
      <h1>How to Build a Backend for Golang?</h1>
      <p>35min</p>
      <h2>Введение</h2>
      <p>
        В этом учебном пособии вы научитесь создавать и тестировать полный бэкенд для Golang с использованием Back4App.
      </p>
      <p>
        Мы проведем вас через интеграцию основных функций Back4App — таких как управление базами данных, настройки безопасности, аутентификация пользователей, хранение файлов и Cloud Code — чтобы создать безопасный, гибкий и масштабируемый бэкенд, который хорошо работает с вашим Go http сервером.
      </p>
      <p>
        Мы сосредоточимся на использовании RESTful API Back4App для подключения к базе данных из нашего Golang http клиента, а не на использовании специализированного Parse SDK, чтобы проиллюстрировать, как создавать легко поддерживаемые функции-обработчики для вашего нового бэкенда.
      </p>
      <p>
        Вы увидите, как этот подход снижает сложность разработки по сравнению с настройкой собственных серверов с нуля.
      </p>
      <p>
        Полагаясь на системы реального времени Back4App, хранение файлов и аутентификацию пользователей, вы ускорите процесс создания вашего бэкенда.
      </p>
      <p>
        К концу вы узнаете, как создать безопасный бэкенд на Golang, планировать автоматизированные задачи и интегрировать внешние вебхуки.
      </p>
      <p>
        Вы будете хорошо подготовлены, чтобы развить эту основу в готовое к производству приложение или добавить пользовательскую логику по мере необходимости.
      </p>
      <h2>Предварительные требования</h2>
      <ul>
        <li>Учетная запись Back4App</li>
        <li>Новый проект Back4App</li>
        <li>Среда разработки Go (Golang)</li>
        <li>Базовые знания о пакете http Go и RESTful API</li>
      </ul>
    </div>
  );
}

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

export default Guide;