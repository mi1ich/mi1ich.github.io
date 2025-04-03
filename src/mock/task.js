import { Status } from "../const.js";

export const tasks = [
  {
    taskslist: ["Сходить в магаз", "Пойти погулять", "Устроиться на работу"],
    status: Status.BACKLOG
  },
  {
    taskslist: ["Выучить JS", "Выучить React", "Создать приложение на Vue.js"],
    status: Status.PROCESSING
  },
  {
    taskslist: ["Разработать сервер на .NET (C#)", "Настроить маршрутизацию в React"],
    status: Status.DONE
  },
  {
    taskslist: ["Оптимизировать код на Vue.js", "Удалить ненужные файлы", "Очистить базу данных", "Изучить архитектуру .NET Core"],
    status: Status.BASKET
  }
]
