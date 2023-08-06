  
    const typeColor = {
      bug: "#26de81",
      dragon: "#ffeaa7",
      electric: "#fed330",
      fairy: "#FF0069",
      fighting: "#30336b",
      fire: "#f0932b",
      flying: "#81ecec",
      grass: "#00b894",
      ground: "#EFB549",
      ghost: "#a55eea",
      ice: "#74b9ff",
      normal: "#95afc0",
      poison: "#6c5ce7",
      psychic: "#a29bfe",
      rock: "#2d3436",
      water: "#0190FF",
    };

    const url = "https://pokeapi.co/api/v2/pokemon";
    const cards = document.querySelector(".cards");
    const btnMore = document.querySelector(".more");
     const searchInput = document.querySelector('#effect5');

  
    let currentNumberOfCards = 4;


    const getPokeDataById = (id) => {
      const finalUrl = `${url}/${id}`;
      return fetch(finalUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const generateCard = (data) => {
      const hp = data.stats[0].base_stat;
      const imgSrc = data.sprites.other.dream_world.front_default;
      const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
      const statAttack = data.stats[1].base_stat;
      const statDefense = data.stats[2].base_stat;
      const statSpeed = data.stats[5].base_stat;
      const themeColor = typeColor[data.types[0].type.name];

      const cardDiv = document.createElement("div");
      cardDiv.id = "card";
      cardDiv.innerHTML = `
        <p class="hp">
          <span>HP</span>
          ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types"></div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      `;

      appendTypes(cardDiv, data.types);
      styleCard(cardDiv, themeColor);
      cards.appendChild(cardDiv);
    };

    const appendTypes = (cardDiv, types) => {
      const typesDiv = cardDiv.querySelector(".types");
      typesDiv.innerHTML = "";
      types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        typesDiv.appendChild(span);
      });
    };

    const styleCard = (cardDiv, color) => {
      cardDiv.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
      cardDiv.querySelectorAll(".types span").forEach((typeColor) => {
        typeColor.style.backgroundColor = color;
      });
    };

    const fetchAndGenerateCards = async (numberOfCardsToShow) => {
  for (let i = 0; i < numberOfCardsToShow; i++) {
    let id = Math.floor(Math.random() * 150) + 1;
    const data = await getPokeDataById(id);
    if (data) {
      generateCard(data);
      
    }
  }
};

const viewMore = () => {
  fetchAndGenerateCards(currentNumberOfCards);
};



  

    const filterCardsBySearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const allCards = document.querySelectorAll('#card');

      allCards.forEach((card) => {
        const pokeName = card.querySelector('.poke-name').textContent.toLowerCase();
        if (pokeName.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    searchInput.addEventListener('input', filterCardsBySearch);

    window.addEventListener("load", fetchAndGenerateCards(currentNumberOfCards));
    btnMore.addEventListener('click', viewMore);