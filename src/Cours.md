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

[Client HTTP]
│
▼
[Controller] ──> [DTO validation]
│
▼
[Service]
│
▼
[Repository]
│
▼
[Entity]
│
▼
[Base de données]
