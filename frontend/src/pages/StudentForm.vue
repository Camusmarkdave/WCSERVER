<template>
  <div class="form-container">
    <h2>Student Form</h2>
    <form @submit.prevent="addStudent">
      <div>
        <label>Student ID:</label>
        <input v-model="student.student_id" required />
      </div>
      <div>
        <label>First Name:</label>
        <input v-model="student.first_name" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="student.last_name" required />
      </div>
      <div>
        <label>Section:</label>
        <input v-model="student.section" required />
      </div>
      <button type="submit">Add Student</button>
    </form>

    <h3>Students List</h3>
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Section</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, index) in students" :key="s.student_id">
          <td>{{ s.student_id }}</td>
          <td>{{ s.first_name }}</td>
          <td>{{ s.last_name }}</td>
          <td>{{ s.section }}</td>
          <td>
            <button @click="deleteStudent(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        student_id: "",
        first_name: "",
        last_name: "",
        section: "",
      },
      students: [],
    };
  },
  methods: {
    async addStudent() {
      try {
        const res = await fetch("http://localhost:3000/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.student),
        });
        const data = await res.json();
        this.students.push(data);
        this.student = { student_id: "", first_name: "", last_name: "", section: "" };
      } catch (err) {
        console.error(err);
      }
    },
    async deleteStudent(index) {
      const student = this.students[index];
      try {
        await fetch(`http://localhost:3000/api/students/${student.student_id}`, {
          method: "DELETE",
        });
        this.students.splice(index, 1);
      } catch (err) {
        console.error(err);
      }
    },
  },
  async mounted() {
    const res = await fetch("http://localhost:3000/api/students");
    this.students = await res.json();
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
