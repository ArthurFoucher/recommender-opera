# recommender-opera
 
*The recommender needs to plug into a specific neo4j database to be functional. Update [run_cypher_query.js](models/run_cypher_query.js).*
 
The tool quickly tests models for a spectacle recommandation system. it computes 
and compares models to create a spectacle recommandation for clients based on their
previous tickets and a proximity score between spectacles computed with the model.

## What it does
The neo4j database contains client and spectacle data for the last 4 seasons.
The model uses the first three as a training set and the last as a performance indicator.

The spectacle similarity score based on client data is computed using the 
[Jaccard similarity coefficient](https://en.wikipedia.org/wiki/Jaccard_index)
The model asks for ranges of ponderation to apply to the variables used to computethe score 
(description similarity based on tf-idf, composers, venue, etc).

## Usage

### Installation
After cloning the repo, install the dependicies by running
```bash
npm install
```
then launch the server 
```bash
npm start
```
and go to [localhost:3000/](http://localhost:3000/)

### Pages
#### Main
Choose the ranges of ponderation to compare.

#### Résultats
View each model and it correlation to the client data.

#### Graphes
Force-oriented graph representation of the spectacle proximity, computed with the model 
on the right, with the client data on the left.

#### Spectacles proches
For each of the last season's spectacles, view its 5 closest neighbors in the training set.

#### Rappel et précision
View the kpi for each spectacle of the last season :

**Rappel** : Percentage of people whose presence was correctly anticipated out of the actual client list.
See [sensitity](https://en.wikipedia.org/wiki/Sensitivity_and_specificity#Sensitivity)

**Précision** : Percentage of people whose presence was correctly anticipated out of the computed list.
