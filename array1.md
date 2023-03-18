```c

#pragma once
#include <stdlib.h>
#include <assert.h>

struct int_array {
    int* data;
    int size;
    int capacity;
};

int int_array_reserve(struct int_array* p, int n)
{
    if (n > p->capacity) {
        
        if (n > (INT_MAX / sizeof(p->data[0])))
        {
           return 0; /*overflow because n * sizeof(p->data[0]) will be  bigger than INT_MAX*/
        }
        
        void* pnew = realloc(p->data, n * sizeof(p->data[0]));
        if (pnew)
        {
            p->data = pnew;
            p->capacity = n;
        }
        else
        {
            return 0; /*out of mem*/
        }
    }
    
    return p->capacity;
}

int int_array_push(struct int_array* p, int value)
{
    if (p->size + 1 > p->capacity) {
        int n = p->capacity * 2;
        if (n == 0) {
            n = 1;
        }
        
        if (int_array_reserve(p, n) == 0) {
            return 0;
        }
    }

    p->data[p->size] = value;
    p->size++;

    return p->size;
}

void int_array_destroy(struct int_array* p)
{
    free(p->data);
}



int main()
{
    struct int_array a = { 0 };
    int_array_push(&a, 1);
    int_array_push(&a, 2);
    for (int i = 0; i < a.size; i++) {
        printf("%d\n", a.data[i]);
    }
    int_array_destroy(&a);
}
```


