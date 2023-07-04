export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
  
load() {
  const entries = [
    {
     login: "maykbrito",
     name: "Mayk Brito",
     public_repos: "76",
     followers: "12000",
    },
    {
     login: "diego3g",
     name: "Diego Fernandes",
     public_repos: "76",
     followers: "12000",
    },
  ]

 this.entries = entries 

}

}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    
    this.update()
  }

  update() {
    this.removeAllTr()


    entries.forEach((user) => {
      console.log(user)
    })
  }
  
  createRow() { 
    const tr = document.createElement('tr')
  
    const content = `
    
          <td class="tableUser">
            <img src="https://github.com/fabianolxs.png" alt="">
            <a href="https://github.com/fabianolxs">
              <p>Fabiano Xavier</p>
              <span>/fabianolxs</span>
            </a>
          </td>
          <td class="repositories">123</td>
          <td class="followers">1234</td>
          <td>
            <button class="removeUser">Remove</button>
          </td>
        
    `
  
    tr.innerHTML = content
  
    return tr
  }


  removeAllTr() {
  const tbody = this.root.querySelector('table tbody')
 
  tbody.querySelectorAll('tr')
  .forEach((tr) => {
    tr.remove()
  })
}


}
