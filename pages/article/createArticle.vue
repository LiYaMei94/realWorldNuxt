<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @click.prevent="">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="articleForm.title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="articleForm.description" type="text" class="form-control" placeholder="What's this article about?" />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model="articleForm.body"
                                    class="form-control"
                                    rows="8"
                                    placeholder="Write your article (in markdown)"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input @change="tagChange" type="text" class="form-control" placeholder="Enter tags" />
                                <div class="tag-list">
                                    <span v-for="(item, index) in tagList" :key="index" class="tag-default tag-pill ng-binding ng-scope">
                                        <i class="ion-close-round" @click="removeTag(item)"></i>
                                        {{ item }}
                                    </span>
                                </div>
                            </fieldset>
                            <button @click="submit" class="btn btn-lg pull-xs-right btn-primary" type="button">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import markdownIt from 'markdown-it';
import { createArticle, updateArticle, articleDetail } from '../../network/api';
export default {
    middleware: 'authenticated',
    name: 'CreateArticle',
    watch: {
        $route(from, to) {
            this.getDetail();
        }
    },
    data() {
        return {
            articleForm: {},
            tagList: []
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            const query = this.$route.query;
            const { article } = query.slug ? await articleDetail({ slug: query.slug }) : await {};
            this.articleForm = article ? article : {};
            this.tagList = article ? article.tagList : [];
            // console.log(article);
        },

        submit() {
            const api = this.$route.query.slug
                ? updateArticle({ slug: this.$route.query.slug, article: { ...this.articleForm, tagList: this.tagList } })
                : createArticle({ article: { ...this.articleForm, tagList: this.tagList } });
            api.then(res => {
                // console.log(res);
                this.$router.push('/');
            });
            // console.log(this.articleForm);
        },
        removeTag(tag) {
            let index = this.tagList.findIndex(item => item == tag);
            this.tagList.splice(index, 1);
        },
        tagChange(event) {
            let tag = event.currentTarget.value;
            if (this.tagList.indexOf(tag) === -1) {
                this.tagList.push(tag);
            }
        }
    }
};
</script>

<style></style>
