# Gallery Application

## Opis Aplikacji

Aplikacja Gallery pozwala użytkownikom na tworzenie galerii, dodawanie, przeglądanie, edytowanie oraz usuwanie obrazków w ramach swoich galerii. Użytkownicy mogą zarządzać swoimi galeriami, a także dodawać do nich opisy i inne szczegóły.

## Funkcje Aplikacji

- Rejestracja i logowanie użytkowników
- Tworzenie, przeglądanie, edytowanie i usuwanie galerii
- Dodawanie, przeglądanie, edytowanie i usuwanie obrazków w galeriach
- Przeglądanie listy galerii oraz obrazków w wybranej galerii

## Wykorzystane Pakiety

- `express`: framework webowy dla Node.js
- `express-async-handler`: obsługa błędów asynchronicznych w Express
- `express-validator`: walidacja i sanitizacja danych formularzy
- `passport`: middleware do uwierzytelniania użytkowników
- `bcryptjs`: hashowanie haseł
- `pug`: silnik szablonów

## Opis Interfejsu (Ścieżek/API)

#### /galleries
-  Pobiera listę wszystkich galerii.

#### /galleries/gallery_add
-  Wyświetla formularz dodawania nowej galerii.


#### /galleries/gallery_browse
-  Wyświetla formularz przeglądania galerii.


#### /galleries/delete
-  Wyświetla formularz usuwania galerii.


#### /images
-  Pobiera listę wszystkich obrazków.


#### /images/image_add
-  Wyświetla formularz dodawania nowego obrazka.


#### /images/:id/edit
-  Wyświetla formularz edycji obrazka.


#### /images/:id/delete
-  Obsługuje usuwanie obrazka.

#### /index
-  Wyświetla stronę główną.


#### /stats
-  Wyświetla statystyki aplikacji.


#### /users
-  Pobiera listę wszystkich użytkowników.

#### /users/user_add
-  Wyświetla formularz dodawania nowego użytkownika.

#### /users/user_login
-  Wyświetla formularz logowania.

#### /users/user_logout
-  Wylogowuje użytkownika.


## Opis Konstrukcji Aplikacji

Aplikacja jest zbudowana zgodnie z architekturą typową dla aplikacji internetowych opartych na Node.js i frameworku Express.js. Korzysta z bazy danych MongoDB oraz szablonów generowanych przez silnik Pug. Poniżej znajduje się opis głównych elementów konstrukcji aplikacji:

### Struktura Katalogów

- **`app.js`**: Główny plik aplikacji, który definiuje i konfiguruje middleware, trasy oraz połączenie z bazą danych.
- **`routes/`**: Katalog zawierający pliki z trasami aplikacji.
- **`controllers/`**: Katalog zawierający kontrolery, które obsługują logikę aplikacji.
- **`models/`**: Katalog zawierający definicje modeli Mongoose.
- **`views/`**: Katalog zawierający szablony Pug.


### Technologie

Aplikacja wykorzystuje następujące technologie i narzędzia:

- **Node.js**: Środowisko uruchomieniowe JavaScript.
- **Express.js**: Framework webowy dla Node.js.
- **MongoDB**: Baza danych NoSQL.
- **Mongoose**: Biblioteka do modelowania danych MongoDB.







