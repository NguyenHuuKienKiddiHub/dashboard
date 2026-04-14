/**
 * Route-query-driven filter state for the school list.
 *
 * All filter values are derived from `route.query` (read-only computed).
 * Any change goes through `pushQuery` → single `router.push` → single
 * reactive update → useFetch fires exactly once, no duplicates.
 *
 * URL shape:
 *   ?page=1&per_page=20&membership=0&verify=1&type=1,3&saler_id=25&customer_id=30&category=1&status=1
 */
export function useSchoolFilter() {
    const route = useRoute()
    const router = useRouter()

    // ── Read-only computed values from route query ────────────────────────────
    const membership = computed<number | null>(() =>
        route.query.membership !== undefined && route.query.membership !== ''
            ? Number(route.query.membership)
            : null
    )

    const verify = computed<number | null>(() =>
        route.query.verify !== undefined && route.query.verify !== ''
            ? Number(route.query.verify)
            : null
    )

    const types = computed<number[]>(() => {
        const t = route.query.type
        if (!t) return []
        return String(t).split(',').map(Number).filter(Boolean)
    })

    const salerId = computed<number | null>(() =>
        route.query.saler_id ? Number(route.query.saler_id) : null
    )

    const customerId = computed<number | null>(() =>
        route.query.customer_id ? Number(route.query.customer_id) : null
    )

    const category = computed<number | null>(() =>
        route.query.category ? Number(route.query.category) : null
    )

    const status = computed<number | null>(() =>
        route.query.status !== undefined && route.query.status !== ''
            ? Number(route.query.status)
            : null
    )

    const name = computed<string | null>(() =>
        route.query.name ? String(route.query.name) : null
    )

    /** JSON string fed directly to the API `compare` query param. */
    const compareJson = computed(() => {
        const obj: Record<string, unknown> = {}
        if (membership.value !== null) obj.membership_expired = membership.value
        if (verify.value !== null) obj.verify = verify.value
        if (types.value.length > 0) obj.type = types.value
        if (salerId.value !== null) obj.saler_id = salerId.value
        if (customerId.value !== null) obj.customer_id = customerId.value
        if (category.value !== null) obj.category = category.value
        if (status.value !== null) obj.status = status.value
        if (name.value !== null) obj.name = name.value
        return JSON.stringify(obj)
    })

    // ── Single push helper ────────────────────────────────────────────────────
    /**
     * Merge a patch into the current query and push it.
     * null/undefined removes the key. Resets `page` unless the patch includes it.
     */
    function pushQuery(patch: Record<string, string | number | null | undefined>) {
        const q: Record<string, string> = {}
        for (const [k, v] of Object.entries(route.query)) {
            if (v !== undefined && v !== null) q[k] = String(v)
        }
        for (const [k, v] of Object.entries(patch)) {
            if (v === null || v === undefined) delete q[k]
            else q[k] = String(v)
        }
        // Reset page when anything other than page/per_page changes
        if (!('page' in patch)) delete q.page
        router.push({ query: q })
    }

    // ── Setters ───────────────────────────────────────────────────────────────
    function setMembership(val: number | null) { pushQuery({ membership: val }) }
    function setVerify(val: number | null) { pushQuery({ verify: val }) }

    function toggleType(val: number) {
        const next = types.value.includes(val)
            ? types.value.filter((v) => v !== val)
            : [...types.value, val]
        pushQuery({ type: next.length > 0 ? next.join(',') : null })
    }

    function clearTypes() { pushQuery({ type: null }) }
    function setSalerId(val: number | null) { pushQuery({ saler_id: val }) }
    function setCustomerId(val: number | null) { pushQuery({ customer_id: val }) }
    function setCategory(val: number | null) { pushQuery({ category: val }) }
    function setStatus(val: number | null) { pushQuery({ status: val }) }
    function setName(val: string | null) { pushQuery({ name: val }) }

    function reset() { router.push({ query: {} }) }

    return {
        membership, verify, types, salerId, customerId, category, status, name, compareJson,
        setMembership, setVerify, toggleType, clearTypes, setSalerId, setCustomerId,
        setCategory, setStatus, setName,
        pushQuery, reset,
    }
}
