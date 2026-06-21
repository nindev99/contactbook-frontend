<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chính Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
import ContactService from '../services/contact.service.js'
export default {
  components: { ContactForm },
  props: { id: { type: String, required: true } },
  data() {
    return {
      contact: null,
      message: '',
    }
  },
  methods: {
    async fetchContact() {
      try {
        const response = await ContactService.get(this.id)
        this.contact = response
      } catch (error) {
        console.error('Error fetching contact:', error)
        this.$router.push({
          name: 'notfound',
          params: { pathMatch: this.$route.path.split('/').slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        }) // Redirect to contacts list if contact not found
      }
    },
    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data)
        alert('Cập nhật liên hệ thành công!')
        this.$router.push({
          name: 'ContactBook',
        })
      } catch (error) {
        console.error('Error updating contact:', error)
        alert('Cập nhật liên hệ thất bại.')
      }
    },
    async deleteContact() {
      if (confirm('Bạn có chắc muốn xóa liên hệ này?')) {
        try {
          await ContactService.delete(this.contact._id)
          this.$router.push({
            name: 'ContactBook',
          })
        } catch (error) {
          console.error('Error deleting contact:', error)
        }
      }
    },
  },
  created() {
    this.fetchContact(this.id)
    this.message = ''
  },
}
</script>
