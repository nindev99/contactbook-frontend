<template lang="">
  <VForm @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field id="name" name="name" class="form-control" type="text" v-model="contactLocal.name" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        id="email"
        name="email"
        class="form-control"
        type="email"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        id="address"
        name="address"
        class="form-control"
        type="text"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Số điện thoại</label>
      <Field
        id="phone"
        name="phone"
        class="form-control"
        type="text"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        id="favorite"
        class="form-check-input"
        type="checkbox"
        v-model="contactLocal.favorite"
      />
      <label for="favorite">Liên hệ Yêu thích</label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Lưu</button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-secondary" @click="cancelEdit">Thoát</button>
    </div>
  </VForm>
</template>
<script>
import * as yup from 'yup'
import { Form as VForm, Field, ErrorMessage } from 'vee-validate'
export default {
  components: { VForm, Field, ErrorMessage }, // Form đang bị lỗi reserved
  emits: ['submit:contact', 'delete:contact'],
  props: { contact: { type: Object, required: true } },
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required('Tên phải có giá trị.')
        .min(2, 'Tên phải có ít nhất 2 ký tự.')
        .max(50, 'Tên không được vượt quá 50 ký tự.'),
      email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
      address: yup.string().max(100, 'Địa chỉ không được vượt quá 100 ký tự.'),
      phone: yup
        .string()
        .matches(
          /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d-.\s]{7,10}$/,
          'Số điện thoại không hợp lệ',
        ),
      favorite: yup.boolean(),
    })
    return {
      contactLocal: this.contact,
      contactFormSchema,
    }
  },
  methods: {
    submitContact() {
      this.$emit('submit:contact', this.contactLocal)
    },
    deleteContact() {
      if (confirm('Bạn có chắc muốn xóa liên hệ này?')) {
        this.$emit('delete:contact', this.contactLocal._id)
      }
    },
    cancelEdit() {
      const reply = window.confirm('Bạn có chắc muốn hủy chỉnh sửa? Mọi thay đổi sẽ bị mất.')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'ContactBook' })
      }
    },
  },
}
</script>
<style scoped>
@import '@/assets/form.css';
</style>
