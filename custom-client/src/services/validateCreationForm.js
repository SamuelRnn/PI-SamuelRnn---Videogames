const validateCreationForm = (form) => {
  const errorToSet = {
    name: false,
    description: false,
    released: false,
    rating: false,
  }
  if(form.name.length < 4 && form.name.length !== 0) errorToSet.name = true;
  if(form.description.length < 30 && form.description.length !== 0) errorToSet.description = true;

  if(+form.released[0] >= 32 || isNaN(form.released[0]) || +form.released === 0) errorToSet.released = true;
  if(+form.released[1] > 12 || isNaN(form.released[1]) || +form.released === 0) errorToSet.released = true;
  if(+form.released[2] < 1950 || +form.released[2] === 0 || isNaN(+form.released[2]) ) errorToSet.released = true;
  if(form.released[0] === '' && form.released[1] === '' &&form.released[2] === '') errorToSet.released = false;
  
  if(+form.rating > 5 || +form.rating < 1 || isNaN(form.rating)) errorToSet.rating = true;
  if(form.rating.length !== 4 && form.rating.length !== 0) errorToSet.rating = true;
  if(form.rating === '') errorToSet.rating = false;

  return errorToSet
}
export default validateCreationForm; 