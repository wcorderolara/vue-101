Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <div>
                <span class="tab" 
                    v-for="(tab, index) in tabs" 
                    :key="index"
                    @click="selectedTab = tab"
                    :class="{activeTab: selectedTab === tab }"
                >
                    {{tab}}
                </span>
            </div>

            <div v-show="selectedTab === 'Reviews'">
                <div id="product-reviews" class="reviews">
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{review.name}}</p>
                            <p>Rating: {{review.rating}}</p>
                            <p>{{review.review}}</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-show="selectedTab === 'Make a Review'">
                <product-review @review-submitted="addReview"></product-review>
            </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    },
    methods: {
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
})