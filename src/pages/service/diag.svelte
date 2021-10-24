<Page
  name="diag"
  class={`page`}
  pageContent={true}>

  <Navbar title={$t('service.diag.title')} backLink="Back" />

<!-- Диагностика -->
<List accordionList>
  <ListItem accordionItem class={`settings-main__list-item`}>
    <div slot='title' class={`list-input__label list-input__label-text_color`}>
      <span>{$t('service.diag.acord.title1')}</span>
    </div>
    <AccordionContent>
      <Block>
        <p><b>1. Частое мигание светодиода. Название точки доступа блока "Cosmoiler_NA" или только цифры</b></p>
        <p> - выполните пп. 1-5 раздела "Обратная связь";</p>
        <p> - настройте в смартфоне точку доступа с именем <b>сosmoiler</b> и паролем <b>12345678</b>;</p>
        <p> - выполните команду id;</p>
        <p> - если частое миагание светодиода сохраняется, см. "Руководство по эксплуатации", либо свяжитесь с разработчиками.</p>
        <p><b>1.1. Обновление ПО блока при отсуствии с ним связи</b></p>
        <p> - настройте точку доступа в устройстве, через которое планируется обновление, с именем <b>cosmoiler</b> и паролем <b>12345678</b>;</p>
        <p> - выключите питание блока;</p>
        <p> - нажмите и удерживайте кнопку;</p>
        <p> - включите питание блока;</p>
        <p> - после того как погаснет светодиод, выключите питание блока;</p>
        <p> - включите питание блока;</p>
        <p> - после погасания светодиода отпустите кнопку;</p>
        <p> - светодиод должен начать мигать короткими вспышками;</p>
        <p> - после установления соединения с сервером обновления светодиод начнет мигать хаотично;</p>
        <p> - при успешном обновлении (через 1-2 минуты) светодиод загорится, погаснет и снова загорится, аналогично процессу при включении блока;</p>
        <p> - при ошибке обновления светодиод будет постоянно гореть, повторите процесс обновления;</p>

        <p><b>2. Отсутствует Wi-Fi блока (не является неисправностью, см. "Руководство по эксплуатации").</b></p>
        <p> - выключите и включите зажигание. В течение 60 сек подключитесь к блоку;</p>
        <p> - возможно включение Wi-Fi с помощью кнопки управления без выключения зажигания:
          сделайте 4 или более коротких нажатия на кнопку.</p>
      </Block>
    </AccordionContent>
  </ListItem>
  <ListItem accordionItem class={`settings-main__list-item`}>
    <div slot='title' class={`list-input__label list-input__label-text_color`}>
      <span>{$t('service.diag.acord.title2')}</span>
    </div>
    <AccordionContent>
      <Block>
        <p>1. Установите приложение Mobile Telnet (MT) через Google Play.</p>
        <p>2. В меню MT выберите Telnet Settings и установите следующие значения: Remote Host Name or IP - 192.168.4.1, Telnet Port - 23.</p>
        <p>3. Подключитесь к точке доступа Wi-Fi блока управления.</p>
        <p>4. В меню MT выберите Connect.</p>
        <p>5. Нажмите кнопку 4 раза. Пауза между нажатиями не должна быть более 10 секунд.</p>
        <p>5. Введите пароль 123 и нажмите Send</p>
        <p>6. В MT скопируте текст и отправьте, указав серийный номер Вашего смазчика в теме письма, на e-mail: cosmoiler@gmail.com</p>
      </Block>
    </AccordionContent>
  </ListItem>
  <ListItem accordionItem class={`settings-main__list-item`}>
    <div slot='title' class={`list-input__label list-input__label-text_color`}>
      <span>{$t('service.diag.acord.title3')}</span>
    </div>
    <AccordionContent>
      <Block>
        <p>Для обновления ПО блока управления необходимо:</p>
        <p>1. Скачать и сохранить в смартфоне два файла: </p>
        <p>- файл прошивки с именем firmware_ESP32@XYYZm.bin, где XYYZm - номер версии</p>
        <p>- файл настроек с именем spiffs_ESP32@Zm.img, где Zm - номер версии</p>
        <p><b>Примечание:</b> Цифра Z в именах скачиваемых файлов должна быть одинаковая.</p>
        <Button outline lager href="http://cosmoiler.ru/download/stable/ESP32/" external>Скачать файлы</Button>
        <p></p>
        <p>2. В разделе <Link href="/service/update/"><b>Обновление</b></Link> выполнить следующие действия: </p>
        <p>- выбрать сохраненный файл spiffs_ESP32@Zm.img и нажать кнопку "Обновить"</p>
        <p>- выбрать сохраненный файл firmware_ESP32@XYYZm.bin и нажать кнопку "Обновить"</p>
        <p><b>Примечание: </b>Кроме полного обновления также возможно обновление прошивки или настроек отдельно.</p>
      </Block>
    </AccordionContent>
  </ListItem>
</List>

</Page>

<script>
    import {
      Page,
      Navbar,
      Block,
      List,
      ListItem,
      Link,
      Button,
      AccordionContent
    } from 'framework7-svelte';
    import {t} from '../../services/i18n.js';

</script>
