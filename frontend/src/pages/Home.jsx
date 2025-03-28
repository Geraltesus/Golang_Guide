import { Link } from "react-router-dom";
import { HeaderIned, HeaderOuted } from "../components/Header";
import '../styles/Home.css'

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuth = !user;

  return (
    <div>
      {isAuth ? <HeaderIned /> : <HeaderOuted />}

      <div className="contentContainer">
        <div className="titleContainer">
          <h1>How to Build a Backend for Golang?</h1>
        </div>
        <div className="thingContainer">
          <h2>Введение</h2>
          <p>
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
            <li>Учетная запись Back4App Зарегистрируйтесь бесплатно <a href="https://www.back4app.com" target="_blank" rel="noopener noreferrer">здесь</a>.</li>
            <li>
            <a href="https://www.back4app.com/docs/get-started/new-parse-app" target="_blank" rel="noopener noreferrer">Новый проект Back4App</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
