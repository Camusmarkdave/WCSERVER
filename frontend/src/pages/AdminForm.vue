<template>
  <div class="form-container">
    <h2>Admin Form</h2>
    <form @submit.prevent="addAdmin">
      <div>
        <label>Admin ID:</label>
        <input v-model="admin.adminId" required />
      </div>
      <div>
        <label>First Name:</label>
        <input v-model="admin.firstName" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="admin.lastName" required />
      </div>
      <div>
        <label>Department:</label>
        <input v-model="admin.department" required />
      </div>
      <div>
        <label>Upload File:</label>
        <input type="file" @change="handleFileUpload" />
      </div>
      <button type="submit">Submit</button>
    </form>

    <h3>Admins List</h3>
    <table>
      <thead>
        <tr>
          <th>Admin ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Department</th>
          <th>File</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a, index) in admins" :key="a.adminId">
          <td>{{ a.adminId }}</td>
          <td>{{ a.firstName }}</td>
          <td>{{ a.lastName }}</td>
          <td>{{ a.department }}</td>
          <td>{{ a.file }}</td>
          <td>
            <button @click="deleteAdmin(a.adminId, index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      admin: {
        adminId: "",
        firstName: "",
        lastName: "",
        department: "",
        file: "",
      },
      fileObj: null,
      admins: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.fileObj = event.target.files[0];
    },
    async addAdmin() {
      try {
        const formData = new FormData();
        formData.append("adminId", this.admin.adminId);
        formData.append("firstName", this.admin.firstName);
        formData.append("lastName", this.admin.lastName);
        formData.append("department", this.admin.department);
        if (this.fileObj) {
          formData.append("file", this.fileObj);
        }

        const res = await axios.post("http://localhost:3000/api/admins", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.admins.push(res.data);
        this.admin = { adminId: "", firstName: "", lastName: "", department: "", file: "" };
        this.fileObj = null;
      } catch (err) {
        console.error("Error adding admin:", err);
      }
    },
    async deleteAdmin(id, index) {
      try {
        await axios.delete(`http://localhost:3000/api/admins/${id}`);
        this.admins.splice(index, 1);
      } catch (err) {
        console.error("Error deleting admin:", err);
      }
    },
    async fetchAdmins() {
      try {
        const res = await axios.get("http://localhost:3000/api/admins");
        this.admins = res.data;
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    },
  },
  mounted() {
    this.fetchAdmins();
  },
};
</script>

<style scoped>
.form-container {
  background: #fff5e6;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #ccc;
  margin: 20px auto;
  max-width: 600px;
}
h2, h3 {
  text-align: center;
  color: #5c3d2e;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background: #5c3d2e;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #814c2c;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background: #c49c78;
  color: white;
}
</style>
