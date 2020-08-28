<template>
    <div class="layouts">
        <LayoutHeader></LayoutHeader>
        <nuxt-child></nuxt-child>
        <LayoutFooter></LayoutFooter>
    </div>
</template>

<script>
import LayoutHeader from './header';
import LayoutFooter from './footer';
export default {
    components: {
        LayoutHeader,
        LayoutFooter
    },
    name: 'LayoutIndex'
};
</script>

<style></style>
