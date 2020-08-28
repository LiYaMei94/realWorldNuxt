<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ article.title }}</h1>

                <div class="article-meta">
                    <nuxt-link
                        :to="{
                            name: 'profile',
                            params: {
                                username: article.author.username
                            }
                        }"
                    >
                        <img :src="article.author.image" />
                    </nuxt-link>
                    <div class="info">
                        <a href="" class="author">{{ article.author.username }}</a>
                        <!-- <span class="date">January 20th</span> -->
                        <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                    </div>
                    <!-- <button class="btn btn-sm btn-outline-secondary">
                        <i class="ion-plus-round"></i>
                        &nbsp; Follow Eric Simons
                        <span class="counter">(10)</span>
                    </button>
                    &nbsp;&nbsp;
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="ion-heart"></i>
                        &nbsp; Favorite Post
                        <span class="counter">(29)</span>
                    </button> -->
                </div>
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12">
                    <p>
                        {{ article.description }}
                    </p>
                    <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                    <p>{{ article.body }}</p>
                </div>
            </div>

            <hr />

            <!-- <div class="article-actions">
                <div class="article-meta">
                    <a href="profile.html"><img src="../../static/images/5b201b8dc08efa5ba5ede60e0cf1db1.jpg" /></a>
                    <div class="info">
                        <a href="" class="author">Eric Simons</a>
                        <span class="date">January 20th</span>
                    </div>

                    <button class="btn btn-sm btn-outline-secondary">
                        <i class="ion-plus-round"></i>
                        &nbsp; Follow Eric Simons
                        <span class="counter">(10)</span>
                    </button>
                    &nbsp;
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="ion-heart"></i>
                        &nbsp; Favorite Post
                        <span class="counter">(29)</span>
                    </button>
                </div>
            </div> -->

            <!-- <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <form class="card comment-form">
                        <div class="card-block">
                            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                        </div>
                        <div class="card-footer">
                            <img src="../../static/images/5b201b8dc08efa5ba5ede60e0cf1db1.jpg" class="comment-author-img" />
                            <button class="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="../../static/images/5b201b8dc08efa5ba5ede60e0cf1db1.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="../../static/images/5b201b8dc08efa5ba5ede60e0cf1db1.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                            <span class="mod-options">
                                <i class="ion-edit"></i>
                                <i class="ion-trash-a"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { articleDetail } from '../../network/api';
export default {
    middleware: 'authenticated',
    name: 'ArticleIndex',
    async asyncData({ query }) {
        const { article } = await articleDetail({ slug: query.slug });
        return {
            article
        };
        console.log(article);
    }
};
</script>

<style></style>
