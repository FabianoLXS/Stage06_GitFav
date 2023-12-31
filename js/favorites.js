import { GithubUser } from "./GithubUser.js"


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    const entries = JSON.parse(localStorage.getItem("@github-favorites:")) || []

    this.entries = entries
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }

  async add(username) {
    try {
      const userExists = this.entries.find((entry) => entry.login === username)

      if (userExists) {
        throw new Error(" Usuário já cadastrado")
      }

      const user = await GithubUser.search(username)
      if (user.login === undefined) {
        throw new Error("Usuário não encontrado!")
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
    this.onAdd()
  }

  onAdd() {
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")

      this.add(value)
    }
  }

  update() {

    this.emptyState()
    this.removeAllTr()

    this.entries.forEach((user) => {
      const row = this.createRow()

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`
      row.querySelector(".user img").alt = `Image of ${user.name}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user a").href = `https://github.com/${user.login}`
      row.querySelector(".user span").textContent = `/${user.login}`
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
            <img src="" alt="">
            <a href="">
              <p></p>
              <span></span>
            </a>
          </td>
          <td class="repositories"></td>
          <td class="followers"></td>
          <td>
            <button class="removeUser">Remover</button>
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

  emptyState(){
    if (this.entries.length === 0) {
      this.root.querySelector('.empty-state').classList.remove('hide')
    } else {
      this.root.querySelector('.empty-state').classList.add('hide')
    }
  }


}
