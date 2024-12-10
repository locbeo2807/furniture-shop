<template>
  <footer class="bg-white dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <router-link to="/" class="flex items-center">
            <i class="fas fa-store text-2xl text-yellow-500 mr-2"></i>
            <span
              class="text-xl font-semibold whitespace-nowrap dark:text-white"
              >Funiro</span
            >
          </router-link>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            400 University Drive Suite 200 Coral Gables,<br />
            FL 33134 USA
          </p>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 md:grid-cols-3">
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
            >
              Links
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium space-y-2">
              <li><a href="#" class="hover:underline">Home</a></li>
              <li><a href="#" class="hover:underline">Shop</a></li>
              <li><a href="#" class="hover:underline">About</a></li>
              <li><a href="#" class="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
            >
              Help
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium space-y-2">
              <li><a href="#" class="hover:underline">Payment Options</a></li>
              <li><a href="#" class="hover:underline">Returns</a></li>
              <li><a href="#" class="hover:underline">Privacy Policies</a></li>
            </ul>
          </div>
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
            >
              Newsletter
            </h2>
            <form class="flex items-center space-x-2">
              <input
                type="email"
                class="text-gray-500 dark:bg-gray-700 dark:text-gray-400 px-3 py-2 text-sm rounded-md"
                placeholder="Enter Your Email Address"
              />
              <button
                class="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="sm:flex sm:items-center sm:justify-between mt-6">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023 Funiro. All rights reserved.</span
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>
