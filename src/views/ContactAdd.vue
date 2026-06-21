<template>
  <div class="page">
    <h4>Thêm Liên hệ mới</h4>
    <ContactForm :contact="contact" @submit:contact="createContact" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactForm from '@/components/ContactForm.vue'
import ContactService from '@/services/contact.service.js'
export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {
        name: '',
        email: '',
        address: '',
        phone: '',
        favorite: false,
      },
      message: '',
    }
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data)
        alert('Thêm liên hệ mới thành công!')
        this.$router.push({ name: 'ContactBook' })
      } catch (error) {
        console.error('Error creating contact:', error)
        this.message = 'Có lỗi xảy ra khi thêm liên hệ.'
      }
    },
  },
}
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  margin: 0 auto;
}
</style>
