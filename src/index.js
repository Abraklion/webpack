// импортируем модаль сервис
import AppService from "./modules/app.service";

// импортируем модаль настроек
import {config} from './modules/config';

// импортируем модаль компоненты
import "./modules/header.component";

// импортируем стили CSS
import "./css/index.css";

// импортируем стили LESS
import "./less/index.less";

// импортируем стили Scss
import "./scss/index.scss";

console.log("ВОт здесь" + config.key);

const service = new AppService("Hello world!")

service.log();

