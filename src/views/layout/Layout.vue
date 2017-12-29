<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<navbar></navbar>
		<div class="show-container">
			<sidebar class="sidebar-container"></sidebar>
			<div class="main-container">
				<div class="inner-main">
					<tags-view></tags-view>
					<app-main></app-main>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: #fff;
		}
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
	.main-container {
		margin-top: 50px;
		background-color: #d2d2d2;
	}
	.inner-main {
		position: fixed;
		top: 50px;
		left: 210px;
		right: 0px;
		bottom: 0px;
		border:10px solid #d2d2d2;

	}
	.app-main {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 40px;
		overflow-y: scroll;
		@include boxSizing;
		@include scrolling;
	}

</style>
