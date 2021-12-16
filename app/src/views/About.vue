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
        <fa :icon="['fab', 'github']" /><span>joselfv.1979@gmail.com</span>
      </li>
      <li>
        <fa :icon="['fas', 'envelope']" /><span>joselfv.1979@gmail.com</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.about {
  padding: 2rem;
}

li {
  margin: 1rem;
  font-size: 1.3rem;
}

span {
  margin: 0.5rem;
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
