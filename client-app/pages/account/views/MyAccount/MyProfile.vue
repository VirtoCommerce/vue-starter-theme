<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab data-cy="my-profile-tab_personal-data" title="Personal data">
      <p class="message">
        Feel free to edit any of your details below so your account is always up to date
      </p>

      <ProfileUpdateForm
        :user="me"
        @submit="updatePersonalData"></ProfileUpdateForm>
      <p class="notice">
        At Brand name, we attach great importance to privacy issues and are
        committed to protecting the personal data of our users. Learn more about
        how we care and use your personal data in the
        <a href="">Privacy Policy.</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab data-cy="my-profile-tab_password-change" title="Password change">
      <p class="message">
        If you want to change the password to access your account, enter the
        following information:<br>Your current email address is
        <span class="message__label">example@email.com</span>
      </p>

      <PasswordResetForm @submit="updatePassword"></PasswordResetForm>
    </SfTab>
  </SfTabs>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import { useUser, ProfileUpdateForm, PasswordResetForm } from '@libs/account';
import { SfTabs, SfInput, SfButton } from '@libs/storefrontUI/vue';


extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords not match'
});

export default {
  components: {
    SfTabs,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser, changePassword, loadMe, me, loading } = useUser();
    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        if(data.succeeded){
          await onComplete(data);
        }
        else {
          console.log(data);
          onError( data.errors );
        }
      } catch (error) {
        onError([{ description: error }]);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser(form.value), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword(form.value.currentPassword, form.value.newPassword), onComplete, onError);

    onMounted(async () => {
      await loadMe();
    });


    return {
      me : computed(()=> me.value ),
      updatePersonalData,
      updatePassword
    };
  }
};
</script>

<style lang='scss' scoped>
@import "assets/styles/scss/all.scss";
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
