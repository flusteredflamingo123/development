# Development

### Link to Deployed Website
https://flusteredflamingo123.github.io/development/ 

### Goal and Value of the Application
I've developed a page that allows a user to view some of the possible Scrabble words that can be played from a set of letters, sort them by score or length, and filter them by letter used. The user can also add words to a list and view the total score of the aggregated words.

### Usability Principles Considered
The usability of the interface is upheld by having a clear menu hierarchy, obvious and intuitive buttons, and a clear separation between the menu (which remains static as the user scrolls) and the collection of word cards.

### Organization of Components
Besides the main App component, the page uses a Menu component for the section displaying the sorting and filtering options as well as the aggregated word list, and a Card component containing each word's image and details. The App component renders a Card for each word that should be displayed and passes functions for sorting and filtering to the Menu component to feed to its buttons and checkboxes.

### How Data is Passed Down Through Components
See above.

### How the User Triggers State Changes
The collection of words that should be displayed as cards on screen and the set of aggregated words are stored as state variables. When the user filters by a letter, the displayed words state is updated such that words without that letter are removed. Similarly, when the user adds or removes items from the word list, the aggregated words state is updated so that the page rerenders with those changes.

