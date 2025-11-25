<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <h1 class="text-3xl font-serif font-bold mb-8 text-center">Contact Us</h1>

        <div class="grid md:grid-cols-2 gap-12">
            <div>
                <h2 class="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p class="text-gray-600 mb-6">Have questions about our products or your order? We're here to help.</p>

                <div class="space-y-4">
                    <div class="flex items-start">
                        <div class="font-bold w-24">Email:</div>
                        <div>support@luxora.com</div>
                    </div>
                    <div class="flex items-start">
                        <div class="font-bold w-24">Phone:</div>
                        <div>+91 98765 43210</div>
                    </div>
                    <div class="flex items-start">
                        <div class="font-bold w-24">Address:</div>
                        <div>
                            Luxora Jewelry<br>
                            123 Fashion Street, Koramangala<br>
                            Bangalore, Karnataka 560034<br>
                            India
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg">
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold mb-2">Name</label>
                        <input type="text"
                            class="w-full border p-2 rounded focus:outline-none focus:border-luxora-gold">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Email</label>
                        <input type="email"
                            class="w-full border p-2 rounded focus:outline-none focus:border-luxora-gold">
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2">Message</label>
                        <textarea rows="4"
                            class="w-full border p-2 rounded focus:outline-none focus:border-luxora-gold"></textarea>
                    </div>
                    <button class="w-full bg-black text-white py-3 font-bold hover:bg-gray-800 transition">
                        SEND MESSAGE
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
