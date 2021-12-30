Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
    
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>Shipping: {{shipping}}
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div class="color-box" 
                    v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    :style="{backgroundColor: variant.variantColor}"
                    @mouseover="updateProduct(index)">
            </div>
            <div>
                <button v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{disabledButton: !inStock}">
                    Add to Cart</button>
            </div>
        </div>
        
        <product-tabs :reviews="reviews"></product-tabs>


    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './images/vmSocks-green.jpeg',
                    varianQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './images/vmSocks-blue.jpeg',
                    varianQuantity: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].varianQuantity
        },
        shipping(){
            if (this.premium) {
                return "Free"
            }else {
                return 2.99
            }
        }
    }
})