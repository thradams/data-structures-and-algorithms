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
    if (p->size == INT_MAX) {
       /*after this point is overflow*/
       return 0;
    }
    
    if (p->size + 1 > p->capacity) {
    
       if (p->capacity > INT_MAX / 2 ) {
          /*after this point is overflow*/
          return 0;
       }
    
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


