//open database name DDM_DB version 1
const DBOpenRequest = window.indexedDB.open('DDM_DB',1);

//event handlers if opened succesfully or not
DBOpenRequest.onerror = (event) => {
   note.appendChild(createListItem('Error loading database.'));
};

DBOpenRequest.onsuccess = (event) => {
   note.appendChild(createListItem('Database initialised.'));

   // Store the result of opening the database in the db variable. This is used a lot below
   db = DBOpenRequest.result;

   // Run the displayData() function to populate the task list with all the to-do list data already in the IndexedDB
   displayData();
};

//when new version of the database is created
DBOpenRequest.onupgradeneeded = (event) => {
   db = event.target.result;

   db.onerror = (event) => {
     
   };

   //create Object store for the database
   const objectStore = db.createObjectStore('downTime', { keyPath: 'id' });

   //define data store in objectstore
   objectStore.createIndex('unitID', 'unitID', { unique: false });
   objectStore.createIndex('model', 'model', { unique: false });
   objectStore.createIndex('serial', 'serial', { unique: false });
   objectStore.createIndex('machine', ['unitID','Model','serial',], { unique: false });

};



