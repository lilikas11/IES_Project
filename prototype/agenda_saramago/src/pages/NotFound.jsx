import React from "react";

const NotFound = () => {
  return (
    <div class="grid place-content-center px-4">
      <div class="text-center">
        <img src="/404.jpg" width="800vw" height="800vh"/>

        <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ups!
        </p>

        <p class="mt-4 text-black">Parece que viajaste para demasiado longe!</p>

        <a
          href="/"
          class="mt-6 inline-block rounded bg-primary px-5 py-3 text-sm font-medium text-primary-content hover:bg-secondary focus:outline-none focus:ring"
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
