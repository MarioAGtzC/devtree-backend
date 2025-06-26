const user = ['username','name','email','password','description'];

export const registerUser = user.filter(i => i !== 'description');
export const loginUser = user.filter(i => ['email', 'password'].includes(i));