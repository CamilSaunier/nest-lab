# Comprendre l'archi imposé par le framework

1. Entities
   Définissent la structure des tables en base de données (modèle objet).

2. DTO (Data Transfer Object)
   Définissent la forme des données attendues en entrée/sortie (validation, typage).

3. Services
   Contiennent la logique métier : manipulent les entités, utilisent les repositories, appliquent les règles métier.

4. Modules
   Regroupent les services, contrôleurs et déclarent les entités à utiliser (avec TypeOrmModule).

5. Controllers
   Exposent les routes HTTP : reçoivent les requêtes, appellent les services, retournent les réponses.

[Client HTTP] ← (Exemple : navigateur, Postman, front-end)
│
▼
[Controller] ← (Reçoit la requête, définit la route, appelle le service)
│
▼
[DTO Validation] ← (Valide et typpe les données reçues, protège l’application)
│
▼
[Service] ← (Contient la logique métier, vérifie les règles, manipule les entités)
│
▼
[Repository] ← (Interface TypeORM pour accéder à la base, ex : find, save, delete)
│
▼
[Entity] ← (Représente la table en base, structure les données)
│
▼
[Base de données] ← (Stocke et retourne les données réelles)

Client HTTP : C’est l’utilisateur ou une application qui envoie une requête (GET, POST, etc.).
Controller : C’est le point d’entrée du backend, il reçoit la requête et appelle le bon service.
DTO Validation : Les données reçues sont validées (types, formats, champs obligatoires) pour éviter les erreurs et les failles.
Service : C’est ici que la logique métier s’applique (ex : vérifier l’unicité d’un email, hasher un mot de passe).
Repository : Fournit les méthodes pour interagir avec la base (find, save, update, delete).
Entity : Définit la structure des données (modèle objet, correspond à une table).
Base de données : Stocke les données, les récupère ou les modifie selon la requête.
