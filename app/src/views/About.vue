<template>
  <div class="about">
    <h1>Contact</h1>
    <ul>
      <li>
        <fa :icon="['fab', 'linkedin']" />
        <span
          ><a href="https://www.linkedin.com/in/jose-luis-fernandez-vicente/"
            >linkedin.com/in/jose-luis-fernandez-vicente</a
          ></span
        >
      </li>
      <li>
        <fa :icon="['fab', 'github']" /><span
          ><a href="https://github.com/joselfv1979/post-app"
            >github.com/joselfv1979/post-app</a
          ></span
        >
      </li>
      <li>
        <fa :icon="['fas', 'envelope']" /><span>joselfv.1979@gmail.com</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  margin-bottom: 3rem;
}


ul {
  margin: auto
}

li {
  margin: 1rem;
  font-size: 1.3rem;
  text-align: justify;
}

span {
  color: #fff;
  margin: 0.5rem;
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
