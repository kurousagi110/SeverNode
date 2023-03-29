const login = async (email, password) => {

    try {
        const user = data.find(item=>item.email == email);
        if(user && user.password == password) {
            return user;
        }
        return null;
    } catch (error) {
        console.log('User service login error: ',error);
        throw error;
    }

};
module.exports = {login}
var data=[
    {_id: 1, email: '123@gmail.com', password:'123', name:'Hoang'},
    {_id: 2, email: 'nghiadaumoi@gmail.com', password:'123456', name:'nghia'},
    {_id: 3, email: 'nghiadaubuoi@gmail.com', password:'123456', name:'trong'},
    {_id: 4, email: 'nghiamatheo@gmail.com', password:'123456', name:'huan'},
    {_id: 5, email: 'nghialolicon@gmail.com', password:'123456', name:'an'},
]