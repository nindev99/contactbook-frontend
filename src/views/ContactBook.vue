<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>

    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <router-link
          v-slot="{ navigate }"
          v-if="activeContact._id"
          :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }"
          custom
        >
          <button class="mt-2 btn btn-warning" @click="navigate">
            <i class="fas fa-edit"></i> Hiệu chính
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ContactList from '@/components/ContactList.vue'
import ContactCard from '@/components/ContactCard.vue'
import InputSearch from '@/components/InputSearch.vue'
import ContactService from '@/services/contact.service.js'
export default {
  components: {
    ContactList,
    ContactCard,
    InputSearch,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: '',
    }
  },
  watch: {
    searchText() {
      this.activeIndex = -1
    },
  },
  computed: {
    // Chuyển các đối tượng liên hệ thành chuỗi để tiện cho việc tìm kiếm
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact
        return `${name} ${email} ${address} ${phone}`
      })
    },
    // Trả về các liên hệ lọc theo thông tin tìm kiếm
    filteredContacts() {
      if (!this.searchText) return this.contacts
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].toLowerCase().includes(this.searchText.toLowerCase()),
      )
    },
    activeContact() {
      if (this.activeIndex < 0) return null
      return this.filteredContacts[this.activeIndex]
    },
    filteredContactsCount() {
      return this.filteredContacts.length
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList() {
      this.retrieveContacts()
      this.activeIndex = -1
    },
    async removeAllContacts() {
      if (confirm('Bạn có chắc chắn muốn xóa tất cả liên hệ?')) {
        try {
          await ContactService.deleteAll()
          this.refreshList()
        } catch (error) {
          console.log(error)
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: 'contact.add' })
    },
  },
  mounted() {
    this.retrieveContacts()
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
