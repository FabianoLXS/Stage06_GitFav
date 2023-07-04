export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint).then(data => data.json()).then(data => ({
      login: data.login,
      name: data.name,
      public_repos: data.public_repos,
      followers: data.followers
    }))
  }
}


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    
  }

  load() {
    const entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []

    this.entries = entries
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    
    this.entries = filteredEntries
    this.update()
  }
}


export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach((user) => {
      const row = this.createRow()

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`
      row.querySelector(".user img").alt = `Image of ${user.name}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user span").textContent = user.login
      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".removeUser").onclick = () => {
        const isOk = confirm("Are you sure you want to delete this row?")
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement("tr")

    const content = `
    
          <td class="user">
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
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
