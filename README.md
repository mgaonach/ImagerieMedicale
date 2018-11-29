# Projet ACDC - Imagerie médicale - Partie 2

## Angular

Lancer le serveur de développement avec `ng serve`.
Build : lancer `ng build`, avec l'option `--prod` pour la production.

## CORS

/!\ Pour que l'analyse automatique puisse fonctionner, il est nécessaire d'autoriser les CORS sur le stockage Firebase.

Une méthode pour autoriser :
- Télécharger **gsutil** : https://cloud.google.com/storage/docs/gsutil_install
- Créer un fichier `cors.json` contenant les informations suivantes :
```JSON
[
	{
		"origin": ["*"],
		"method": ["GET"],
		"maxAgeSeconds": 3600
	}
]
```
*Vous pouvez remplacer `["*"]` par `["domaine_hebergement"]` pour restreindre l'accès à ce domaine uniquement.*
- Une fois gsutil installé et configuré, lancer cette commande en remplacant `exampleproject.appspot.com` par le nom de votre bucket :
`gsutil cors set cors.json gs://exampleproject.appspot.com`
