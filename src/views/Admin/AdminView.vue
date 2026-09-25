<template>

    <div class="admin">

        <!-- Левое меню -->

        <aside class="sidebar">

            <div class="logo">

                ⚡ Servis53

                <span>Admin</span>

            </div>

            <nav>

                <button v-for="tab in tabs" :key="tab.id" :class="{ active: currentPage === tab.id }"
                    @click="currentPage = tab.id">
                    {{ tab.title }}
                </button>

            </nav>

        </aside>

        <!-- Правая часть -->

        <main class="content">

            <!-- Главная -->

            <template v-if="currentPage === 'dashboard'">

                <h1>
                    Добро пожаловать 👋
                </h1>

                <p class="subtitle">
                    Панель управления Servis53
                </p>

                <div class="cards">

                    <div class="card" v-for="stat in stats" :key="stat.title">

                        <span>{{ stat.icon }}</span>

                        <h2>{{ stat.value }}</h2>

                        <p>{{ stat.title }}</p>

                    </div>

                </div>

            </template>

            <!-- Товары -->

            <template v-if="currentPage === 'products'">

                <div class="page-header">

                    <h1>
                        📦 Товары
                    </h1>

                    <button class="add-btn" @click="openCreateProduct">
                        + Добавить товар
                    </button>

                </div>

                <table class="products-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Фото</th>
                            <th>Название</th>
                            <th>Категория</th>
                            <th>Бренд</th>
                            <th>Цена</th>
                            <th>Кол-во</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="product in products" :key="product.id">

                            <td>{{ product.id }}</td>

                            <td>
                                <img v-if="product.images.length" class="table-image"
                                    :src="productImageUrl(product.id, product.images[0])">
                                <span v-else class="table-image">📦</span>
                            </td>

                            <td>{{ product.name }}</td>

                            <td>{{ product.category }}</td>

                            <td>{{ product.brand }}</td>

                            <td>{{ formatPrice(product.price) }} ₽</td>

                            <td>{{ product.quantity }}</td>

                            <td>

                                <button class="edit" @click="openEditProduct(product.id)">
                                    ✏️
                                </button>

                                <button class="delete" @click="removeProduct(product.id)">
                                    🗑
                                </button>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

            <!-- Пользователи -->

            <template v-if="currentPage === 'users'">

                <h1>
                    👥 Пользователи
                </h1>

                <table class="users-table">

                    <thead>

                        <tr>
                            <th @click="sortBy('id')">ID</th>
                            <th @click="sortBy('fullName')">Имя</th>
                            <th @click="sortBy('login')">Логин</th>
                            <th @click="sortBy('email')">Почта</th>
                            <th @click="sortBy('phone')">Телефон</th>
                            <th @click="sortBy('role')">Роль</th>
                            <th>Действия</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="user in sortedUsers" :key="user.id">

                            <td>{{ user.id }}</td>
                            <td>{{ user.fullName || "—" }}</td>
                            <td>{{ user.login }}</td>
                            <td>{{ user.email || "—" }}</td>
                            <td>{{ user.phone || "—" }}</td>
                            <td>{{ user.role || "Без роли" }}</td>

                            <td class="actions">

                                <template v-if="user.id !== auth.user?.id">

                                    <button class="edit-btn" @click="openRoleEdit(user)">
                                        ✏️
                                    </button>

                                    <button class="delete-btn" @click="removeUser(user.id)">
                                        🗑
                                    </button>

                                </template>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

            <!-- Заказы -->

            <template v-if="currentPage === 'orders'">

                <h1>
                    🛒 Заказы
                </h1>

                <table class="users-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Клиент</th>
                            <th>Телефон</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                            <th></th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="order in orders" :key="order.id">

                            <td>{{ order.id }}</td>
                            <td>{{ formatDate(order.orderDate) }}</td>
                            <td>{{ order.userName || "—" }}</td>
                            <td>{{ order.userPhone || "—" }}</td>
                            <td>{{ formatPrice(order.totalPrice) }} ₽</td>

                            <td>
                                <select v-model="order.status" class="status-select"
                                    @change="changeOrderStatus(order)">
                                    <option v-for="status in orderStatuses" :key="status" :value="status">
                                        {{ status }}
                                    </option>
                                </select>
                            </td>

                            <td>
                                <button @click="openOrder(order)">
                                    Подробнее
                                </button>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

            <!-- Ремонт -->

            <template v-if="currentPage === 'repairs'">

                <h1>
                    🔧 Ремонты
                </h1>

                <table class="users-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Клиент</th>
                            <th>Телефон</th>
                            <th>Услуга</th>
                            <th>Проблема</th>
                            <th>Статус</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="repair in repairs" :key="repair.id">

                            <td>{{ repair.id }}</td>
                            <td>{{ formatDate(repair.dateCreated) }}</td>
                            <td>{{ repair.userName || "—" }}</td>
                            <td>{{ repair.userPhone || "—" }}</td>
                            <td>{{ repair.deviceType || "—" }}</td>
                            <td>{{ repair.problem || "—" }}</td>

                            <td>
                                <select v-model="repair.status" class="status-select"
                                    @change="changeRepairStatus(repair)">
                                    <option v-for="status in repairStatuses" :key="status" :value="status">
                                        {{ status }}
                                    </option>
                                </select>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

            <!-- Отзывы -->

            <template v-if="currentPage === 'reviews'">

                <h1>
                    ⭐ Отзывы
                </h1>

                <div v-if="reviews.length === 0" class="empty">
                    Отзывов пока нет
                </div>

                <table v-else class="users-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Товар</th>
                            <th>Пользователь</th>
                            <th>Оценка</th>
                            <th>Комментарий</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="review in reviews" :key="review.id">

                            <td>{{ review.id }}</td>
                            <td>{{ formatDate(review.createdAt) }}</td>
                            <td>#{{ review.productId }}</td>
                            <td>#{{ review.userId }}</td>
                            <td>{{ "⭐".repeat(review.rating || 0) }}</td>
                            <td>{{ review.comment || "—" }}</td>

                            <td class="actions">
                                <button class="delete-btn" @click="removeReview(review.id)">
                                    🗑
                                </button>
                            </td>

                        </tr>

                    </tbody>

                </table>

            </template>

        </main>

        <!-- Окно изменения роли -->

        <div v-if="editRoleUser" class="modal">

            <div class="modal-window">

                <h3>
                    Изменить роль пользователя
                </h3>

                <p class="edit-user-name">
                    {{ editRoleUser.fullName || editRoleUser.login }}
                </p>

                <select v-model="editRoleUser.roleId" class="role-select">
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.roleName }}
                    </option>
                </select>

                <div class="actions">

                    <button class="save-btn" @click="saveRole">
                        💾 Сохранить
                    </button>

                    <button class="cancel-btn" @click="editRoleUser = null">
                        ✖ Отмена
                    </button>

                </div>

            </div>

        </div>

        <!-- Подробности заказа -->

        <div v-if="selectedOrder" class="modal" @click.self="selectedOrder = null">

            <div class="order-modal">

                <h2>
                    📦 Заказ №{{ selectedOrder.id }}
                </h2>

                <div class="order-info">

                    <div>
                        <b>👤 Покупатель</b>
                        <p>{{ selectedOrder.fullName || "—" }}</p>
                    </div>

                    <div>
                        <b>📧 Почта</b>
                        <p>{{ selectedOrder.email || "—" }}</p>
                    </div>

                    <div>
                        <b>📞 Телефон</b>
                        <p>{{ selectedOrder.phone || "—" }}</p>
                    </div>

                    <div>
                        <b>📅 Дата</b>
                        <p>{{ formatDate(selectedOrder.orderDate) }}</p>
                    </div>

                    <div>
                        <b>💰 Сумма</b>
                        <p>{{ formatPrice(selectedOrder.totalPrice) }} ₽</p>
                    </div>

                    <div>
                        <b>🚚 Статус</b>
                        <p>{{ selectedOrder.status }}</p>
                    </div>

                </div>

                <h3>
                    🛒 Состав заказа
                </h3>

                <table class="order-items-table">

                    <thead>
                        <tr>
                            <th>Товар</th>
                            <th>Количество</th>
                            <th>Цена</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="item in selectedOrder.items" :key="item.productId">
                            <td>{{ item.productName }}</td>
                            <td>x{{ item.quantity }}</td>
                            <td>{{ formatPrice(item.price) }} ₽</td>
                        </tr>

                    </tbody>

                </table>

                <button class="close-btn" @click="selectedOrder = null">
                    Закрыть
                </button>

            </div>

        </div>

        <!-- Добавление / редактирование товара -->

        <Transition name="slide">

            <div v-if="showProductForm" class="modal">

                <div class="modal-window">

                    <div class="modal-header">

                        <h2>
                            {{ editingProductId ? `Товар #${editingProductId}` : "Новый товар" }}
                        </h2>

                        <button class="close" @click="closeProductForm">
                            ✕
                        </button>

                    </div>

                    <form class="form" @submit.prevent="saveProduct">

                        <input v-model="form.name" placeholder="Название" required>

                        <textarea v-model="form.description" placeholder="Описание"></textarea>

                        <input v-model.number="form.price" type="number" min="0" step="0.01" placeholder="Цена"
                            required>

                        <input v-model.number="form.quantity" type="number" min="0" placeholder="Количество" required>

                        <input v-model.number="form.warrantyMonths" type="number" min="0"
                            placeholder="Гарантия (месяцев)">

                        <!-- Категория -->

                        <select v-model="form.categoryId" required>

                            <option disabled :value="null">
                                Выберите категорию
                            </option>

                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>

                        </select>

                        <!-- Бренд -->

                        <select v-model="form.brandId" required>

                            <option disabled :value="null">
                                Выберите бренд
                            </option>

                            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                                {{ brand.name }}
                            </option>

                        </select>

                        <!-- Характеристики телефона -->

                        <template v-if="isPhoneCategory">

                            <h3>
                                📱 Характеристики смартфона
                            </h3>

                            <input v-for="field in phoneFields" :key="field.key" v-model="form.phone[field.key]"
                                :placeholder="field.label">

                        </template>

                        <!-- Фотографии -->

                        <div class="upload">

                            <label class="upload-btn">

                                📷 {{ editingProductId ? "Добавить фотографии" : "Выбрать фотографии" }}

                                <input hidden type="file" multiple accept="image/*" @change="selectImages">

                            </label>

                            <div class="preview">
                                <img v-for="item in imagePreviews" :key="item.url" :src="item.url">
                            </div>

                        </div>

                        <button class="save" type="submit" :disabled="saving">
                            {{ saving ? "Сохранение..." : "Сохранить" }}
                        </button>

                    </form>

                </div>

            </div>

        </Transition>

    </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { productImageUrl, errorMessage } from "@/api/api";
import { useAuthStore } from "@/stores/auth";
import {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct,
    uploadProductImages, savePhoneSpec, getCategories, getBrands
} from "@/api/products";
import { getOrders, getOrder, updateOrderStatus } from "@/api/orders";
import { getRepairs, updateRepairStatus } from "@/api/repairs";
import { getUsers, deleteUser, updateUserRole, getRoles } from "@/api/users";
import { getReviews, deleteReview } from "@/api/reviews";

const tabs = [
    { id: "dashboard", title: "📊 Панель" },
    { id: "products", title: "📦 Товары" },
    { id: "users", title: "👥 Пользователи" },
    { id: "orders", title: "🛒 Заказы" },
    { id: "repairs", title: "🔧 Ремонт" },
    { id: "reviews", title: "⭐ Отзывы" }
];

// Статусы совпадают со списками на сервере (OrdersController / RepairsController)
const orderStatuses = ["Новый", "В работе", "Выполнен", "Отменён"];
const repairStatuses = ["Принята", "В работе", "Готово", "Отменена"];

const phoneFields = [
    { key: "screenSize", label: "Размер экрана" },
    { key: "resolution", label: "Разрешение" },
    { key: "processor", label: "Процессор" },
    { key: "ram", label: "Оперативная память" },
    { key: "storage", label: "Память" },
    { key: "rearCamera", label: "Основная камера" },
    { key: "frontCamera", label: "Фронтальная камера" },
    { key: "battery", label: "Аккумулятор" },
    { key: "operatingSystem", label: "Операционная система" },
    { key: "simType", label: "SIM" },
    { key: "network", label: "Сеть" }
];

const auth = useAuthStore();

const currentPage = ref("dashboard");

const products = ref([]);
const productsTotal = ref(0);
const categories = ref([]);
const brands = ref([]);
const users = ref([]);
const roles = ref([]);
const orders = ref([]);
const repairs = ref([]);
const reviews = ref([]);

const sortField = ref("id");
const sortAsc = ref(true);

const editRoleUser = ref(null);
const selectedOrder = ref(null);

const showProductForm = ref(false);
const editingProductId = ref(null);
const saving = ref(false);
const images = ref([]);
const imagePreviews = ref([]);
const form = ref(emptyProductForm());

function emptyProductForm() {
    return {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        warrantyMonths: 12,
        categoryId: null,
        brandId: null,
        phone: Object.fromEntries(phoneFields.map(f => [f.key, ""]))
    };
}

const stats = computed(() => [
    { icon: "📦", value: productsTotal.value, title: "Товаров" },
    { icon: "👥", value: users.value.length, title: "Пользователей" },
    { icon: "🛒", value: orders.value.length, title: "Заказов" },
    { icon: "🔧", value: repairs.value.length, title: "Ремонтов" }
]);

const sortedUsers = computed(() => {

    const direction = sortAsc.value ? 1 : -1;

    return [...users.value].sort((a, b) => {

        // null и пустые значения всегда в конце
        const x = a[sortField.value] ?? "";
        const y = b[sortField.value] ?? "";

        if (typeof x === "number" && typeof y === "number")
            return (x - y) * direction;

        return String(x).localeCompare(String(y), "ru") * direction;

    });

});

const isPhoneCategory = computed(() =>
    categories.value.find(x => x.id === form.value.categoryId)?.name === "Смартфоны"
);

function sortBy(field) {

    if (sortField.value === field) {
        sortAsc.value = !sortAsc.value;
    }
    else {
        sortField.value = field;
        sortAsc.value = true;
    }

}

function formatDate(date) {

    return new Date(date).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

}

function formatPrice(price) {
    return Number(price ?? 0).toLocaleString("ru-RU");
}

// Выполнить действие и показать ошибку сервера, если она есть
async function run(action, fallback) {

    try {
        await action();
        return true;
    }
    catch (e) {
        console.error(e);
        alert(errorMessage(e, fallback));
        return false;
    }

}

// ---------- Загрузка данных ----------

async function loadProducts() {

    // на сервере страница ограничена 100 товарами — забираем все страницы
    const all = [];
    let page = 1;
    let total = 0;

    do {
        const { data } = await getProducts({ page, pageSize: 100, sort: "name" });

        all.push(...data.products);
        total = data.total;
        page++;
    } while (all.length < total);

    products.value = all;
    productsTotal.value = total;
}

async function loadCategories() {
    categories.value = (await getCategories()).data;
}

async function loadBrands() {
    brands.value = (await getBrands()).data;
}

async function loadUsers() {
    users.value = (await getUsers()).data;
}

async function loadRoles() {
    roles.value = (await getRoles()).data;
}

async function loadOrders() {
    orders.value = (await getOrders()).data;
}

async function loadRepairs() {
    repairs.value = (await getRepairs()).data;
}

async function loadReviews() {
    reviews.value = (await getReviews()).data;
}

// ---------- Товары ----------

function openCreateProduct() {

    editingProductId.value = null;
    form.value = emptyProductForm();
    clearImages();
    showProductForm.value = true;

}

async function openEditProduct(id) {

    await run(async () => {

        const { data } = await getProduct(id);

        const phone = emptyProductForm().phone;

        if (data.phone)
            phoneFields.forEach(f => { phone[f.key] = data.phone[f.key] ?? ""; });

        form.value = {
            name: data.name,
            description: data.description ?? "",
            price: data.price,
            quantity: data.quantity,
            warrantyMonths: data.warrantyMonths,
            categoryId: data.categoryId,
            brandId: data.brandId,
            phone
        };

        editingProductId.value = id;
        clearImages();
        showProductForm.value = true;

    }, "Не удалось загрузить товар");

}

function closeProductForm() {

    showProductForm.value = false;
    clearImages();

}

function selectImages(e) {

    clearImages();

    images.value = [...e.target.files];

    imagePreviews.value = images.value.map(file => ({ url: URL.createObjectURL(file) }));

    e.target.value = "";

}

// освобождаем blob-ссылки превью, иначе они копятся в памяти
function clearImages() {

    imagePreviews.value.forEach(item => URL.revokeObjectURL(item.url));

    imagePreviews.value = [];
    images.value = [];

}

async function saveProduct() {

    saving.value = true;

    const { phone, ...product } = form.value;

    const ok = await run(async () => {

        let id = editingProductId.value;

        if (id)
            await updateProduct(id, product);
        else
            id = (await createProduct(product)).data.id;

        if (isPhoneCategory.value)
            await savePhoneSpec(id, phone);

        if (images.value.length > 0)
            await uploadProductImages(id, images.value);

    }, "Не удалось сохранить товар");

    saving.value = false;

    if (ok) {
        closeProductForm();
        await loadProducts();
    }

}

async function removeProduct(id) {

    if (!confirm("Удалить товар?"))
        return;

    if (await run(() => deleteProduct(id), "Не удалось удалить товар"))
        await loadProducts();

}

// ---------- Пользователи ----------

function openRoleEdit(user) {

    editRoleUser.value = {
        id: user.id,
        login: user.login,
        fullName: user.fullName,
        roleId: user.roleId
    };

}

async function saveRole() {

    const ok = await run(
        () => updateUserRole(editRoleUser.value.id, editRoleUser.value.roleId),
        "Не удалось изменить роль"
    );

    if (ok) {
        editRoleUser.value = null;
        await loadUsers();
    }

}

async function removeUser(id) {

    if (!confirm("Удалить пользователя?"))
        return;

    if (await run(() => deleteUser(id), "Не удалось удалить пользователя"))
        await loadUsers();

}

// ---------- Заказы и ремонты ----------

async function openOrder(order) {

    await run(async () => {
        selectedOrder.value = (await getOrder(order.id)).data;
    }, "Не удалось загрузить заказ");

}

async function changeOrderStatus(order) {

    if (!await run(() => updateOrderStatus(order.id, order.status), "Не удалось изменить статус"))
        await loadOrders();

}

async function changeRepairStatus(repair) {

    if (!await run(() => updateRepairStatus(repair.id, repair.status), "Не удалось изменить статус"))
        await loadRepairs();

}

// ---------- Отзывы ----------

async function removeReview(id) {

    if (!confirm("Удалить отзыв?"))
        return;

    if (await run(() => deleteReview(id), "Не удалось удалить отзыв"))
        await loadReviews();

}

onMounted(async () => {

    const results = await Promise.allSettled([
        loadProducts(),
        loadCategories(),
        loadBrands(),
        loadUsers(),
        loadRoles(),
        loadOrders(),
        loadRepairs(),
        loadReviews()
    ]);

    results
        .filter(x => x.status === "rejected")
        .forEach(x => console.error(x.reason));

});
</script>

<style scoped>

.users-table th:hover {

    background: #1d4ed8;

}

.users-table {

    width: 100%;

    border-collapse: collapse;

    background: white;

    border-radius: 18px;

    overflow: hidden;

}

.users-table th {

    cursor: pointer;

    user-select: none;


    background: #2563eb;

    color: white;

    padding: 16px;

    text-align: left;

}

.users-table td {

    padding: 15px;

    border-bottom: 1px solid #ececec;

}

.users-table tr:hover {

    background: #f7faff;

}

.modal {

    position: fixed;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    display: flex;

    justify-content: flex-end;

    align-items: stretch;

    background: rgba(0, 0, 0, .45);

    z-index: 99999;

}

.modal-window {

    width: 650px;

    max-width: 100%;

    height: 100vh;

    background: white;

    overflow: auto;

    padding: 35px;

    box-sizing: border-box;

}

.modal-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 30px;

}

.close {

    border: none;

    background: none;

    font-size: 28px;

    cursor: pointer;

}

.form {

    display: flex;

    flex-direction: column;

    gap: 18px;

}

.form input,

.form textarea {

    padding: 16px;

    border: 1px solid #ddd;

    border-radius: 14px;

    font-size: 16px;

}

.form textarea {

    resize: none;

    min-height: 180px;

}

.save {

    margin-top: 20px;

    padding: 18px;

    border: none;

    border-radius: 16px;

    background: #2563eb;

    color: white;

    font-size: 17px;

    cursor: pointer;

}

.slide-enter-active,

.slide-leave-active {

    transition: .35s;

}

.slide-enter-from,

.slide-leave-to {

    opacity: 0;

}

.slide-enter-from .modal-window,

.slide-leave-to .modal-window {

    transform: translateX(100%);

}

.slide-enter-to .modal-window,

.slide-leave-from .modal-window {

    transform: translateX(0);

}

.products-table {

    width: 100%;

    border-collapse: collapse;

    background: white;

    border-radius: 18px;

    overflow: hidden;

    box-shadow: 0 10px 30px rgba(0, 0, 0, .05);

}

.products-table th {

    text-align: left;

    padding: 18px;

    background: #f5f7fb;

}

.products-table td {

    padding: 18px;

    border-top: 1px solid #eee;

}

.table-image {

    width: 60px;

    height: 60px;

    object-fit: cover;

    border-radius: 12px;

}

.edit {

    margin-right: 10px;

    border: none;

    background: #2563eb;

    color: white;

    border-radius: 10px;

    padding: 10px;

    cursor: pointer;

}

.delete {

    border: none;

    background: #ef4444;

    color: white;

    border-radius: 10px;

    padding: 10px;

    cursor: pointer;

}

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 35px;

}

.add-btn {

    border: none;

    background: #2563eb;

    color: white;

    padding: 14px 26px;

    border-radius: 14px;

    cursor: pointer;

    font-size: 16px;

    transition: .3s;

}

.add-btn:hover {

    transform: translateY(-2px);

}

.empty {

    background: white;

    padding: 80px;

    border-radius: 20px;

    text-align: center;

    color: #888;

    box-shadow: 0 8px 25px rgba(0, 0, 0, .05);

}

.admin {

    display: grid;

    grid-template-columns: 260px 1fr;

    min-height: 100vh;

    background: #f4f7fb;

}

.sidebar {

    background: #111827;

    color: white;

    padding: 35px;

}

.logo {

    font-size: 28px;

    font-weight: 800;

    margin-bottom: 50px;

}

.logo span {

    color: #60a5fa;

}

nav {

    display: flex;

    flex-direction: column;

    gap: 12px;

}

nav button {

    background: none;

    border: none;

    color: #cbd5e1;

    text-align: left;

    padding: 16px;

    border-radius: 14px;

    cursor: pointer;

    font-size: 16px;

    transition: .25s;

}

nav button:hover {

    background: #1e293b;

    color: white;

}

.active {

    background: #2563eb !important;

    color: white !important;

}

.content {

    padding: 50px;

}

h1 {

    font-size: 42px;

    margin-bottom: 10px;

}

.subtitle {

    color: #777;

    margin-bottom: 45px;

}

.cards {

    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 25px;

}

.card {

    background: white;

    border-radius: 22px;

    padding: 35px;

    box-shadow: 0 10px 25px rgba(0, 0, 0, .06);

    transition: .3s;

}

.card:hover {

    transform: translateY(-6px);

}

.card span {

    font-size: 36px;

}

.card h2 {

    margin: 18px 0 5px;

    font-size: 34px;

}

.card p {

    color: #777;

}

.upload {

    margin-top: 10px;

}

.upload-btn {

    display: inline-block;

    background: #2563eb;

    color: white;

    padding: 14px 22px;

    border-radius: 12px;

    cursor: pointer;

}

.preview {

    display: flex;

    flex-wrap: wrap;

    gap: 15px;

    margin-top: 20px;

}

.preview img {

    width: 110px;

    height: 110px;

    object-fit: cover;

    border-radius: 14px;

    box-shadow: 0 5px 15px rgba(0, 0, 0, .12);

}

.actions {

    display: flex;

    gap: 10px;

    justify-content: center;

}

.edit-btn,
.delete-btn,
.save-btn,
.cancel-btn {

    padding: 10px 16px;

    border: none;

    border-radius: 10px;

    cursor: pointer;

    font-weight: 600;

    transition: .25s;

}

.edit-btn {

    background: #2563eb;

    color: white;

}

.edit-btn:hover {

    background: #1d4ed8;

}

.delete-btn,
.cancel-btn {

    background: #ef4444;

    color: white;

}

.delete-btn:hover,
.cancel-btn:hover {

    background: #dc2626;

}

.save-btn {

    background: #16a34a;

    color: white;

}

.save-btn:hover {

    background: #15803d;

}

.edit-user-name {

    margin: 15px 0;

    font-size: 18px;

    font-weight: 600;

    text-align: center;

}

.role-select {

    width: 100%;

    padding: 12px;

    border-radius: 10px;

    border: 1px solid #d1d5db;

    margin-bottom: 20px;

}

.order-modal {

    width: 800px;

    max-width: 95%;

    background: white;

    border-radius: 20px;

    padding: 35px;

    box-shadow: 0 20px 60px rgba(0, 0, 0, .2);

}

.order-info {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 20px;

    margin: 30px 0;

}

.order-info b {

    color: #1e3a8a;

}

.order-info p {

    margin-top: 6px;

}

.order-items-table {

    width: 100%;

    border-collapse: collapse;

    margin-top: 20px;

}

.order-items-table th {

    background: #2563eb;

    color: white;

    padding: 14px;

}

.order-items-table td {

    padding: 14px;

    border-bottom: 1px solid #eee;

}

.order-items-table tr:hover {

    background: #f8fafc;

}

.close-btn {

    margin-top: 30px;

    padding: 12px 30px;

    border: none;

    border-radius: 12px;

    background: #2563eb;

    color: white;

    cursor: pointer;

    font-size: 16px;

}

.close-btn:hover {

    background: #1d4ed8;

}

.status-select {

    padding: 8px 12px;

    border: 1px solid #dbe3ee;

    border-radius: 10px;

    background: white;

    cursor: pointer;

}

.save:disabled {

    opacity: .6;

    cursor: wait;

}
</style>
