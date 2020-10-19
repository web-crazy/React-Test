export const fetchNotes = () => {
  const savedNotes = localStorage.getItem("notes")
  return savedNotes && JSON.parse(savedNotes)
};

export const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const clearLocalStorage = () => {
  localStorage.clear();
}
