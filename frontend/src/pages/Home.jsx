import { Link } from "react-router-dom";
import { Header } from "../components/Header";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuth = !user;

  return (
    <div>
      <Header />

      <div className="contentContainer">
        <div className="titleContainer">
          <h1>How to Build a Backend for Golang?</h1>
        </div>
        <div className="thingContainer">
          <h2>Введение</h2>
          <p className="">
            В этом учебном пособии вы научитесь создавать и тестировать полный
            бэкенд для Golang с использованием Back4App. Мы проведем вас через
            интеграцию основных функций Back4App — таких как управление базами
            данных, настройки безопасности, аутентификация пользователей,
            хранение файлов и Cloud Code — чтобы создать безопасный, гибкий и
            масштабируемый бэкенд, который хорошо работает с вашим Go http
            сервером. Мы сосредоточимся на использовании RESTful API Back4App
            для подключения к базе данных из нашего Golang http клиента, а не на
            использовании специализированного Parse SDK, чтобы
            проиллюстрировать, как создавать легко поддерживаемые
            функции-обработчики для вашего нового бэкенда. Вы увидите, как этот
            подход снижает сложность разработки по сравнению с настройкой
            собственных серверов с нуля. Полагаясь на системы реального времени
            Back4App, хранение файлов и аутентификацию пользователей, вы
            ускорите процесс создания вашего бэкенда. К концу вы узнаете, как
            создать безопасный бэкенд на Golang, планировать автоматизированные
            задачи и интегрировать внешние вебхуки. Вы будете хорошо
            подготовлены, чтобы развить эту основу в готовое к производству
            приложение или добавить пользовательскую логику по мере
            необходимости.
          </p>

          <h2>Предварительные требования</h2>
          <ul>
            <li>
              Учетная запись Back4App Зарегистрируйтесь бесплатно{" "}
              <a
                href="https://www.back4app.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                здесь
              </a>
              .
            </li>
            <li>
              <a
                href="https://www.back4app.com/docs/get-started/new-parse-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Новый проект Back4App
              </a>
            </li>
            <li>
              Среда разработки Go (Golang) Убедитесь, что у вас установлен Go на
              вашем компьютере. Вы можете найти инструкции в
              <a
                href="https://go.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Официальная документация Go
              </a>
              .
            </li>
            <li>
              Базовые знания о пакете http Go и RESTful API Знание того, как
              написать обработчик функции, разобрать сообщения об ошибках,
              обрабатывать запросы метода post и настроить http сервер на
              localhost, будет полезно.
            </li>
          </ul>
          <h2>Шаг 1 – Создание нового проекта на Back4App и подключение</h2>
          <h3>Почему новый проект?</h3>
          <p>
            Создание нового проекта Back4App – это ваш первый шаг. Здесь вы
            будете хранить данные, настраивать файловое хранилище, планировать
            облачные функции и добавлять фоновые задачи. Этот проект бэкенда
            станет основой для всех последующих шагов.
          </p>
          <ol>
            <li>Войдите в свою учетную запись Back4App.</li>
            <li>
              Нажмите “Новое приложение” в вашей панели управления Back4App.
            </li>
            <li>
              Назовите ваше приложение (например, “Golang-Backend-Tutorial”).
              <img
                className="common-image"
                src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/drXO0UqsgxhFvRDiVmsMb_image.png?format=webp&width=1248"
                alt="Изображениe"
                style={{ marginLeft: "10px", verticalAlign: "middle" }}
              />
            </li>
          </ol>
          <p>
            После создания оно появится в вашей панели управления. Это
            приложение теперь является вашим бэкендом на базе Back4App.
          </p>
          <h3>Подключение через REST API</h3>
          <p>
            Back4App предоставляет RESTful API для создания, обновления и
            удаления данных. В Golang мы будем использовать http-клиент из
            стандартной библиотеки Go для связи с этими конечными точками.
          </p>
          <p>
            Найдите ваш Идентификатор приложения и REST API ключ перейдя в
            раздел Настройки или Безопасность и ключи вашего приложения
            Back4App:
          </p>
          <img
            className="common-image"
            src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/F9teHXd_M8ERn1OPGirbi_image.png?format=webp&width=800"
            alt="Изображениe"
            style={{ marginLeft: "10px", verticalAlign: "middle" }}
          />
          <p>
            Вам понадобятся эти учетные данные в каждом заголовке запроса. Мы
            проиллюстрируем это на следующих этапах, когда подключимся к базе
            данных, используя метод POST, GET и другие HTTP-запросы.
          </p>
          <h2>Шаг 2 – Настройка базы данных</h2>
          <h3>Создание модели данных</h3>
          <p>
            Чтобы хранить данные в Back4App, вы определяете классы (таблицы) и
            столбцы (поля). Например, предположим, что мы хотим класс Todo . Вы
            можете создать его вручную в панели управления Back4App:
          </p>
          <ol>
            <li>
              Перейдите в раздел База данных в панели управления вашего
              приложения.
            </li>
            <li>Создайте новый класс с именем “Todo.”</li>
            <li>
              Добавьте столбцы, такие как title (String) и isCompleted
              (Boolean).
            </li>
            <img
              className="common-image"
              src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/iaZ_P-7epc_LSMFIPlaZV_image.png?format=webp&width=1146"
              alt="Изображениe"
              style={{ marginLeft: "10px", verticalAlign: "middle" }}
            />
          </ol>
          <p>
            Вы также можете позволить системе автоматически создавать столбцы,
            отправляя объекты с новыми полями из вашего приложения на Golang.
          </p>
          <h3>Создание модели данных с использованием AI-агента</h3>
          <ol>
            <li>Откройте AI-агента в вашей панели управления приложением.</li>
            <li>
              Опишите вашу желаемую модель данных (например, “Пожалуйста,
              создайте новый класс Todo с полем заголовка и полем
              isCompleted.”).
            </li>
            <li>Примите предложенную схему.</li>
            <img
              className="common-image"
              src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/0snNZwHWzxuXlNu30n7IA_image.png?format=webp&width=800"
              alt="Изображениe"
              style={{ marginLeft: "10px", verticalAlign: "middle" }}
            />
          </ol>
          <p>
            Эта удобная функция экономит время при проектировании схемы вашей
            базы данных.
          </p>
          <h3>
            Чтение и запись данных с использованием REST API (пример на Golang)
          </h3>
          <p>
            Ниже приведен базовый пример того, как создать (метод POST) и
            получить (метод GET) данные с использованием пакета http в Go.
            Предположим, у вас есть ваши APPLICATION_ID и REST_API_KEY в
            качестве переменных окружения.
          </p>

          <pre>
            <code>
              {`package main

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
}

// createTodo sends a POST request to save a new record in the "Todo" class.
func createTodo(todo Todo) (Todo, error) {
    // Convert struct to JSON
    body, _ := json.Marshal(todo)

    // Create HTTP request
    req, err := http.NewRequest("POST", "https://parseapi.back4app.com/classes/Todo", bytes.NewBuffer(body))
    if err != nil {
        return Todo{}, err
    }

    // Set necessary headers
    req.Header.Set("X-Parse-Application-Id", "YOUR_APPLICATION_ID")
    req.Header.Set("X-Parse-REST-API-Key", "YOUR_REST_API_KEY")
    req.Header.Set("Content-Type", "application/json")

    // Execute the request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return Todo{}, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
        bodyBytes, _ := ioutil.ReadAll(resp.Body)
        return Todo{}, fmt.Errorf("API error: %s", string(bodyBytes))
    }

    // Parse response
    var createdTodo Todo
    if err := json.NewDecoder(resp.Body).Decode(&createdTodo); err != nil {
        return Todo{}, err
    }

    return createdTodo, nil
}

// fetchAllTodos retrieves all Todo objects from Back4App using GET
func fetchAllTodos() ([]Todo, error) {
    req, err := http.NewRequest("GET", "https://parseapi.back4app.com/classes/Todo", nil)
    if err != nil {
        return nil, err
    }

    req.Header.Set("X-Parse-Application-Id", "YOUR_APPLICATION_ID")
    req.Header.Set("X-Parse-REST-API-Key", "YOUR_REST_API_KEY")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        bodyBytes, _ := ioutil.ReadAll(resp.Body)
        return nil, fmt.Errorf("API error: %s", string(bodyBytes))
    }

    // Parse response for "results" key
    var result struct {
        Results []Todo \`json:"results"\`
    }

    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }

    return result.Results, nil
}`}
            </code>
          </pre>
          <p>
            В этих примерах мы создаем http-клиент, добавляем необходимые
            заголовки и обрабатываем коды ответа вместе с сообщениями об
            ошибках. Не забудьте заменить YOUR_APPLICATION_ID и
            YOUR_REST_API_KEY на фактические ключи из вашего проекта Back4App.
          </p>
          <h3>Чтение и запись данных с использованием GraphQL API</h3>
          <p>
            Back4App также предоставляет конечную точку GraphQL по адресу
            https://parseapi.back4app.com/graphql. Вы можете использовать
            популярную библиотеку клиента Go GraphQL (например,
            <a
              href="https://github.com/machinebox/graphql"
              target="_blank"
              rel="noopener noreferrer"
            >
              Machine Box graphql
            </a>
            ) для выполнения запросов или мутаций. Это может быть более
            структурированный подход, чем простые вызовы REST.
          </p>
          <h3>Работа с живыми запросами (по желанию)</h3>
          <p>
            Если вы хотите видеть обновления в реальном времени в вашем
            приложении, вы можете включить живые запросы в панели управления
            Back4App. Golang не имеет официальной библиотеки для живых запросов
            Parse. Однако вы можете реализовать собственное соединение по
            веб-сокету, чтобы слушать обновления живых запросов от
            wss://YOUR_SUBDOMAIN.b4a.io. Эта функция полезна для совместных
            приложений, требующих немедленной синхронизации данных.
          </p>
          <h2>Шаг 3 – Применение безопасности с помощью ACL и CLP</h2>
          <h3>Обзор</h3>
          <p>
            Back4App предоставляет списки управления доступом (ACL) и разрешения
            на уровне классов (CLP) для защиты ваших данных. ACL определяются
            для каждого объекта, в то время как CLP определяют общие правила для
            всего класса.
          </p>
          <img
            className="common-image"
            src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/PdAyrw1nqA1QQJFuCc-4t_image.png?format=webp&width=1000"
            alt="Изображениe"
            style={{ marginLeft: "10px", verticalAlign: "middle" }}
          />
          <h3>Разрешения на уровне классов</h3>
          <ol>
            <li>Перейдите в Базу данных вашего приложения в Back4App.</li>
            <li>Выберите класс (например, Todo).</li>
            <li>
              Нажмите Разрешения на уровне классов и установите доступ на
              чтение/запись для различных ролей пользователей или публичного
              доступа.
            </li>
            <img
              className="common-image"
              src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/MF1Uf7HSJF03Xg6djap9m_image.png?format=webp&width=800"
              alt="Изображениe"
              style={{ marginLeft: "10px", verticalAlign: "middle" }}
            />
          </ol>
          <h3>ACL</h3>
          <p>
            Вы можете передать ACL при создании или обновлении объекта через
            REST-вызовы. Это гарантирует, что только определенные пользователи
            или роли могут читать/записывать данные. Для получения
            дополнительной информации посетите
            <a
              href="https://www.back4app.com/docs/security/parse-security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Руководство по безопасности приложений
            </a>
            .
          </p>
          <h2>Шаг 4 – Написание функций облачного кода</h2>
          <h3>Почему облачный код</h3>
          <p>
            Облачный код позволяет вам запускать функции на стороне сервера,
            триггеры или валидации — без управления собственными серверами. Вы
            можете добавлять сложную бизнес-логику или интегрировать внешние API
            со стороны сервера.
          </p>
          <h3>Пример облачной функции</h3>
          <p>
            Простой пример — это функция, которая вычисляет длину текста. В
            вашем main.js файле на панели управления Back4App:
          </p>

          <pre>
            <code className="">
              {`
Parse.Cloud.define('calculateTextLength', async (request) => {
  const { text } = request.params;
  if (!text) {
    throw new Error('No text provided');
  }
  return { length: text.length };
});
                `}
            </code>
          </pre>

          <h3>Развертывание</h3>
          <p>Разверните Cloud Code одним из следующих способов:</p>
          <ul>
            <li>Back4App CLI:</li>
            <li>
              Back4App Dashboard в Cloud Code - Functions. Вставьте ваш код в
              редактор main.js и нажмите Deploy.
            </li>
            <a
              href="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/pGxBQFBhk4prMc8Ub-uho_image.png?format=webp&width=800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Руководство по безопасности приложений
            </a>
            .
          </ul>
          <h3>Вызов Cloud Functions из Golang</h3>
          <p>
            Вы можете вызвать Cloud Function через REST из вашего http клиента:
          </p>
          <pre>
            <code>
              {`
                  func callCalculateTextLength(txt string) (int, error) {
    body, _ := json.Marshal(map[string]string{"text": txt})
    req, err := http.NewRequest("POST", "https://parseapi.back4app.com/functions/calculateTextLength", bytes.NewBuffer(body))
    if err != nil {
        return 0, err
    }

    // Headers
    req.Header.Set("X-Parse-Application-Id", "YOUR_APPLICATION_ID")
    req.Header.Set("X-Parse-REST-API-Key", "YOUR_REST_API_KEY")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return 0, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        bodyBytes, _ := ioutil.ReadAll(resp.Body)
        return 0, fmt.Errorf("API error: %s", string(bodyBytes))
    }

    var result struct {
        Result map[string]int \`json:"result"\`
    }
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return 0, err
    }

    return result.Result["length"], nil
}
                `}
            </code>
          </pre>
          <h2>Шаг 5 – Настройка аутентификации</h2>
          <h3>Включить аутентификацию пользователя</h3>
          <p>
            Back4App использует класс User для аутентификации. Когда вы создаете
            нового пользователя через REST, сервер будет безопасно хранить
            учетные данные и генерировать токен сессии.
          </p>
          <pre>
            <code>
              {`
                curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "secret123", "email": "alice@example.com"}' \
  https://parseapi.back4app.com/users
                `}
            </code>
          </pre>
          <p>
            Используйте возвращенный токен сессии для последующих запросов,
            которые требуют привилегий пользователя. В Go вы отправите тот же
            тип HTTP-запроса из http-клиента, как было показано ранее.
          </p>
          <h3>Социальный вход</h3>
          <p>
            Для социальных входов, таких как Google или Facebook, вам нужно
            будет настроить параметры OAuth на Back4App. Эти потоки часто
            включают обмен токенами. Обратитесь к{" "}
            <a
              href="https://www.back4app.com/docs/platform/sign-in-with-apple"
              target="_blank"
              rel="noopener noreferrer"
            >
              Документации по входу с Apple / Социальный вход
            </a>{" "}
            для получения подробной информации.
          </p>
          <h2>Шаг 6 – Обработка хранения файлов</h2>
          <h3>Настройка и загрузка</h3>
          <p>
            Вы можете хранить файлы на Back4App, отправляя их в виде данных,
            закодированных в base64, или multipart/form-data:
          </p>
          <pre>
            <code>
              {`
                curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "file": {
      "name": "myImage.png",
      "__type": "File",
      "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  }' \
  https://parseapi.back4app.com/files/myImage.png
                `}
            </code>
          </pre>
          <p>
            После загрузки вы можете прикрепить файл к объекту, сохранив
            возвращаемый URL файла или указатель на файл. В Go создайте
            http-запрос аналогичным образом — просто убедитесь, что вы правильно
            кодируете содержимое файла.
          </p>
          <h2>Шаг 7 – Подтверждение электронной почты и сброс пароля</h2>
          <h3>Важность</h3>
          <p>
            Подтверждение электронной почты гарантирует, что пользователи
            контролируют предоставленный адрес электронной почты, в то время как
            сброс пароля помогает им восстановить учетные записи. Оба этих
            функционала повышают безопасность и доверие.
          </p>
          <h3>Включение подтверждения электронной почты</h3>
          <lo>
            <li>Перейдите в ваш Back4App Dashboard.</li>
            <li>В разделе Email Settings, включите проверочные письма.</li>
            <li>При необходимости настройте свои шаблоны электронной почты.</li>
          </lo>
          <p>
            Когда пользователь регистрируется, ему автоматически отправляется
            письмо для подтверждения.
          </p>
          <h3>Сброс пароля</h3>
          <p>
            Используйте{" "}
            <a
              href="https://docs.parseplatform.org/rest/guide/#r-passwordreset"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              конечную точку REST requestPasswordReset
            </a>{" "}
            для инициации сброса пароля:
          </p>
          <pre>
            <code>
              {`
                curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "X-Parse-REST-API-Key: YOUR_REST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}' \
  https://parseapi.back4app.com/requestPasswordReset
                `}
            </code>
          </pre>
          <h2>Шаг 8 – Планирование задач с помощью облачных заданий</h2>
          <h3>Что делают облачные задания</h3>
          <p>
            Облачные задания выполняются по расписанию для автоматизации задач,
            таких как очистка устаревших данных или отправка еженедельных
            новостных рассылок.
          </p>
          <pre>
            <code>
              {`
                Parse.Cloud.job('cleanupOldTodos', async (request) => {
  const Todo = Parse.Object.extend('Todo');
  const query = new Parse.Query(Todo);
  // Remove records older than 30 days
  // ...
});
                `}
            </code>
          </pre>
          <p>
            Разверните это задание и запланируйте его в вашем Back4App Dashboard
            - Настройки приложения - Настройки сервера - Фоновая работа.
          </p>
          <img
            className="common-image"
            src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/5wG60YnWIST74erryTb-u_image.png?format=webp&width=800"
            alt="Изображениe"
            style={{ marginLeft: "10px", verticalAlign: "middle" }}
          />
          <h2>Шаг 9 – Интеграция вебхуков</h2>
          <h3>Зачем нужны вебхуки</h3>
          <p>
            Вебхуки позволяют уведомлять внешние сервисы, когда происходят
            определенные события. Например, вы можете отправлять уведомления в
            Slack, когда создаются новые элементы Todo.
          </p>
          <lo>
            <li>Перейдите в раздел Вебхуки в вашем Back4App Dashboard.</li>
            <li>
              Настройте вашу конечную точку (например,
              https://your-external-service.com/webhook).
            </li>
            <li>Назначьте триггеры (например, afterSave на Todo).</li>
          </lo>
          <img
            className="common-image"
            src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/morUMdwsAbVQ1EmBfUfAA_image.png?format=webp&width=1064"
            alt="Изображениe"
            style={{ marginLeft: "10px", verticalAlign: "middle" }}
          />
          <p>
            Вы также можете вызывать внешние API из облачного кода, написав
            запрос http-клиента, если предпочитаете прямой контроль событий.
          </p>
          <h2>Шаг 10 – Изучение панели администратора Back4App</h2>
          <h3>Обзор</h3>
          <p>
            Приложение Back4App Admin — это интерфейс с возможностью щелчка,
            которым вы можете поделиться с не техническими членами команды для
            управления данными.
          </p>
          <h3>Включите приложение Admin</h3>
          <lo>
            <li>
              Перейдите в Дополнительно - Приложение Admin в вашей панели
              управления Back4App.
            </li>
            <li>Включите его и создайте администратора.</li>
          </lo>
          <img
            className="common-image"
            src="https://images.archbee.com/yD3zCY-NNBBIfd0uqcfR5/5BTk1ntDh9JLXurObmm_o_image.png?format=webp&width=800"
            alt="Изображениe"
            style={{ marginLeft: "10px", verticalAlign: "middle" }}
          />
          <p>
            Используйте выбранный вами поддомен для входа в простой интерфейс
            для манипуляции данными. Это освобождает вас от необходимости писать
            прямые запросы или настраивать пользовательский код для выполнения
            основных операций.
          </p>
          <h3>Заключение</h3>
          <p>
            В этом руководстве вы узнали, как создать бэкенд для Golang с
            использованием Back4App.
          </p>
          <p>
            Вы изучили, как подключиться к базе данных через RESTful API,
            применить меры безопасности с помощью ACL и CLP, запускать
            запланированные задачи с помощью Cloud Jobs, интегрироваться с
            внешними сервисами с использованием Webhooks и настраивать
            аутентификацию пользователей и хранение файлов.
          </p>
          <p>
            С помощью пакета http в Go и мощных функций Back4App вы можете
            создать мощный бэкенд, который экономит время и легко
            масштабируется.
          </p>
          <p>
            Теперь, когда вы освоили основы, вы можете расширить логику функции
            обработчика Golang, подключиться к новым конечным точкам API и
            создать богатое приложение, которое соответствует вашим
            потребностям.
          </p>
          <h3>Следующие шаги</h3>
          <ul>
            <li>
              Усовершенствуйте ваше приложение на Golang: Добавьте расширенные
              функции, такие как доступ на основе ролей, или оптимизируйте ваш
              http-сервер для продакшена.
            </li>
            <li>
              Узнайте больше о запросах в реальном времени: Интегрируйте живые
              запросы для совместных приложений.
            </li>
            <li>
              Изучите расширенную документацию Back4App: Настройте ваши ACL,
              журналы и аналитику.
            </li>
            <li>
              Интегрируйте сторонние API: Используйте Cloud Code или прямые
              вебхуки для расширения функциональности вашего бэкенда.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
